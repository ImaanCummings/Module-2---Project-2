import crypto from "crypto";
import { pool } from "../db.js";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "moderntech-solutions-dev-secret";
const HASH_KEY_LENGTH = 64;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ROLES = new Set(["hr", "manager", "employee"]);

const hashPassword = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, HASH_KEY_LENGTH, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey.toString("hex"));
    });
  });

const createPasswordHash = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = await hashPassword(password, salt);
  return `${salt}:${hashedPassword}`;
};

const verifyPassword = async (password, storedValue) => {
  const [salt, expectedHash] = String(storedValue || "").split(":");

  if (!salt || !expectedHash) {
    return false;
  }

  const incomingHash = await hashPassword(password, salt);
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const incomingBuffer = Buffer.from(incomingHash, "hex");

  if (expectedBuffer.length !== incomingBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, incomingBuffer);
};

const signToken = (payload) => {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
};

const validateAuthPayload = ({ email, password, role }, requireRole = false) => {
  const errors = [];

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    errors.push("'email' is required and must be a valid email address.");
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    errors.push("'password' is required and must be at least 8 characters long.");
  }

  if (requireRole && (!role || typeof role !== "string" || !VALID_ROLES.has(role.trim().toLowerCase()))) {
    errors.push("'role' is required and must be one of: hr, manager, employee.");
  }

  return errors;
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const errors = validateAuthPayload({ email, password, role }, true);

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRole = role.trim().toLowerCase();

    const [existingUsers] = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "A user with that email already exists." });
    }

    const passwordHash = await createPasswordHash(password);

    const [result] = await pool.query(
      `
      INSERT INTO users (email, password_hash, role)
      VALUES (?, ?, ?)
      `,
      [normalizedEmail, passwordHash, normalizedRole]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        email: normalizedEmail,
        role: normalizedRole,
      },
    });
  } catch (error) {
    console.error("Register user error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validateAuthPayload({ email, password });

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [rows] = await pool.query(
      `
      SELECT id, email, password_hash, role
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [normalizedEmail]
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatches = await verifyPassword(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      issuedAt: Date.now(),
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login user error:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};
