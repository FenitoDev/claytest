import express from "express";
import dotenv from "dotenv";

import type { Request, Response } from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("hola");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
