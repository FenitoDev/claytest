import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { translationsRouter } from "./routes/translations.ts";

import { MongoClient, ServerApiVersion } from "mongodb";

import type { Request, Response } from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error("No DB url found!");
app.get("/", (req: Request, res: Response) => {
  res.send("hola");
});

app.use(express.json());
app.use("/api/translations", translationsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

mongoose
  .connect(DB_URL)
  .then(() => console.log("Mongo connected!"))
  .catch((e) => console.error(e));

const client = new MongoClient(DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};
run().catch(console.dir);
