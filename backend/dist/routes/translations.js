import express from "express";
import { Translation } from "../models/translation";
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
