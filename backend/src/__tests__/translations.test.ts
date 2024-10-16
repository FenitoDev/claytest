import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { translationsRouter } from "../routes/translations";
import prisma from "../prisma";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/translations", translationsRouter);

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.translation.deleteMany({});
  await prisma.$disconnect();
});

describe("Translations API", () => {
  let translationId: string;

  it("should create a new translation", async () => {
    const res = await request(app).post("/api/translations").send({
      language: "en",
      key: "hello",
      text: "Hello World",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    translationId = res.body.id;
  });

  it("should retrieve translations by language", async () => {
    const res = await request(app).get("/api/translations/en");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a translation completely", async () => {
    const res = await request(app)
      .put(`/api/translations/${translationId}`)
      .send({
        language: "en",
        key: "hello",
        text: "Hello Updated",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toBe("Hello Updated");
  });

  it("should update a translation partially", async () => {
    const res = await request(app)
      .patch(`/api/translations/${translationId}`)
      .send({
        text: "Hello Partially Updated",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toBe("Hello Partially Updated");
  });

  it("should delete a translation", async () => {
    const res = await request(app).delete(`/api/translations/${translationId}`);
    expect(res.statusCode).toEqual(204);
  });

  it("should return 200 for a non-existent language", async () => {
    const res = await request(app).get(`/api/translations/nonexistent`);
    expect(res.statusCode).toEqual(200);
  });
});
