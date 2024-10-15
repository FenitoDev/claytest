import express from "express";
import prisma from "../prisma.ts";
import { Prisma } from "@prisma/client";

export const translationsRouter = express.Router();

translationsRouter.get("/:language", async (req, res) => {
  const { language } = req.params;
  try {
    const translations = await prisma.translation.findMany({
      where: { language },
    });
    res.status(200).json(translations);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving translations", error });
  }
});

translationsRouter.post("/", async (req, res) => {
  const { language, key, text } = req.body;
  try {
    const newTranslation = await prisma.translation.create({
      data: { language, key, text },
    });
    res.status(201).json(newTranslation);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message, error });
  }
});

translationsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { language, key, text } = req.body;
  try {
    const updatedTranslation = await prisma.translation.update({
      where: { id },
      data: { language, key, text },
    });
    res.status(200).json(updatedTranslation);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2025")
        return res.status(404).json({ message: "Translation not found" });

    res.status(500).json({ message: "Error updating translation", error });
  }
});

translationsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTranslation = await prisma.translation.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(updatedTranslation);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2025")
        return res.status(404).json({ message: "Translation not found" });

    res.status(500).json({ message: "Error updating translation", error });
  }
});

translationsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.translation.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2025")
        return res.status(404).json({ message: "Translation not found" });

    res.status(500).json({ message: "Error deleting translation", error });
  }
});
