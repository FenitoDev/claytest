import express from "express";
import { Translation } from "../models/translation.ts";

export const translationsRouter = express.Router();

translationsRouter.get("/:language", async (req, res) => {
  const { language } = req.params;
  const translations = await Translation.find({ language });
  res.json(translations);
});

translationsRouter.post("/", async (req, res) => {
  const newTranslation = new Translation(req.body);
  await newTranslation.save();
  res.status(201).json(newTranslation);
});

translationsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedTranslation = await Translation.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedTranslation)
      return res.status(404).json({ message: "Translation not found" });
    res.json(updatedTranslation);
  } catch (error) {
    res.status(500).json({ message: "Error updating translation", error });
  }
});

translationsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTranslation = await Translation.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedTranslation) {
      return res.status(404).json({ message: "Translation not found" });
    }

    res.json(updatedTranslation);
  } catch (err) {
    res.status(500).json({ message: "Error updating translation", error: err });
  }
});

translationsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTranslation = await Translation.findByIdAndDelete(id);
    if (!deletedTranslation) {
      return res.status(404).json({ message: "Translation not found" });
    }
    res.status(204).json({ message: "Translation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting translation", error });
  }
});
