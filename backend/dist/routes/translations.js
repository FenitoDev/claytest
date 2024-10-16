"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationsRouter = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../prisma"));
const client_1 = require("@prisma/client");
exports.translationsRouter = express_1.default.Router();
exports.translationsRouter.get("/:language", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language } = req.params;
    try {
        const translations = yield prisma_1.default.translation.findMany({
            where: { language },
        });
        res.status(200).json(translations);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving translations", error });
    }
}));
exports.translationsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language, key, text } = req.body;
    try {
        const newTranslation = yield prisma_1.default.translation.create({
            data: { language, key, text },
        });
        res.status(201).json(newTranslation);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message, error });
    }
}));
exports.translationsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { language, key, text } = req.body;
    try {
        const updatedTranslation = yield prisma_1.default.translation.update({
            where: { id },
            data: { language, key, text },
        });
        res.status(200).json(updatedTranslation);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
            if (error.code === "P2025")
                return res.status(404).json({ message: "Translation not found" });
        res.status(500).json({ message: "Error updating translation", error });
    }
}));
exports.translationsRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedTranslation = yield prisma_1.default.translation.update({
            where: { id },
            data: updateData,
        });
        res.status(200).json(updatedTranslation);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
            if (error.code === "P2025")
                return res.status(404).json({ message: "Translation not found" });
        res.status(500).json({ message: "Error updating translation", error });
    }
}));
exports.translationsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.translation.delete({
            where: { id },
        });
        return res.status(204).send();
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
            if (error.code === "P2025")
                return res.status(404).json({ message: "Translation not found" });
        res.status(500).json({ message: "Error deleting translation", error });
    }
}));
