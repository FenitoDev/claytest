import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { translationsRouter } from "./routes/translations.ts";
import prisma from "./prisma.ts";

import type { Request, Response } from "express";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT);
const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error("No DB url found!");
app.get("/", (req: Request, res: Response) => {
  res.send("hola");
});

app.use(cors());
app.use(express.json());
app.use("/api/translations", translationsRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: ${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
