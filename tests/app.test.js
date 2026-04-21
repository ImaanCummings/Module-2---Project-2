import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import crypto from "crypto";

const mockQuery = vi.fn();

vi.mock("../db.js", () => ({
  pool: {
    query: (...args) => mockQuery(...args),
  },
}));

const loadApp = async () => {
  const mod = await import("../server.js");
  return mod.default;
};

const buildPasswordHash = (password, salt = "testsalt1234567890") => {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

beforeEach(() => {
  mockQuery.mockReset();
});

describe("API", () => {
  it("GET /health returns ok", async () => {
    const app = await loadApp();
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /employees returns employees", async () => {
    mockQuery.mockResolvedValueOnce([[{ employee_id: 1, name: "A" }]]);
    const app = await loadApp();
    const res = await request(app).get("/employees");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ employee_id: 1, name: "A" }]);
  });

  it("POST /employees validates input", async () => {
    const app = await loadApp();
    const res = await request(app).post("/employees").send({ name: "" });
    expect(res.status).toBe(400);
    expect(res.body.errors?.length).toBeGreaterThan(0);
  });

  it("POST /employees inserts employee", async () => {
    mockQuery.mockResolvedValueOnce([{ insertId: 99 }]);
    const app = await loadApp();
    const res = await request(app).post("/employees").send({
      name: "Test",
      position: "Dev",
      department: "IT",
      salary: 50000,
      employment_history: "Joined 2025",
      contact: "test@example.com",
    });
    expect(res.status).toBe(201);
    expect(res.body.employee_id).toBe(99);
  });

  it("GET /attendance returns records", async () => {
    mockQuery.mockResolvedValueOnce([[{ id: 1, employee_id: 1 }]]);
    const app = await loadApp();
    const res = await request(app).get("/attendance");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("POST /attendance validates input", async () => {
    const app = await loadApp();
    const res = await request(app).post("/attendance").send({});
    expect(res.status).toBe(400);
  });

  it("POST /reviews upserts", async () => {
    mockQuery.mockResolvedValueOnce([{}]);
    const app = await loadApp();
    const res = await request(app).post("/reviews").send({
      employee_id: 1,
      name: "Name",
      review: "Great work",
    });
    expect(res.status).toBe(201);
  });

  it("GET /timeoff returns leave records", async () => {
    mockQuery.mockResolvedValueOnce([[{ employee_id: 1, status: "Pending" }]]);
    const app = await loadApp();
    const res = await request(app).get("/timeoff");
    expect(res.status).toBe(200);
    expect(res.body[0].status).toBe("Pending");
  });

  it("PATCH /timeoff/:id updates status", async () => {
    mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]);
    const app = await loadApp();
    const res = await request(app).patch("/timeoff/1").send({ status: "Approved" });
    expect(res.status).toBe(200);
  });

  it("POST /auth/register validates input", async () => {
    const app = await loadApp();
    const res = await request(app).post("/auth/register").send({
      email: "bad-email",
      password: "123",
      role: "guest",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors?.length).toBeGreaterThan(0);
  });

  it("POST /auth/register creates a user", async () => {
    mockQuery.mockResolvedValueOnce([[]]);
    mockQuery.mockResolvedValueOnce([{ insertId: 7 }]);

    const app = await loadApp();
    const res = await request(app).post("/auth/register").send({
      email: "hr@moderntech.com",
      password: "SecurePass123",
      role: "hr",
    });

    expect(res.status).toBe(201);
    expect(res.body.user).toEqual({
      id: 7,
      email: "hr@moderntech.com",
      role: "hr",
    });
  });

  it("POST /auth/login returns a token for valid credentials", async () => {
    mockQuery.mockResolvedValueOnce([
      [
        {
          id: 3,
          email: "manager@moderntech.com",
          role: "manager",
          password_hash: buildPasswordHash("SecurePass123"),
        },
      ],
    ]);

    const app = await loadApp();
    const res = await request(app).post("/auth/login").send({
      email: "manager@moderntech.com",
      password: "SecurePass123",
    });

    expect(res.status).toBe(200);
    expect(res.body.user).toEqual({
      id: 3,
      email: "manager@moderntech.com",
      role: "manager",
    });
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token.length).toBeGreaterThan(20);
  });
});
