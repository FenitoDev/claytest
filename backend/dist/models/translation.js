import mongoose from "mongoose";
const TranslationSchema = new mongoose.Schema({
    language: { type: String, required: true },
    key: { type: String, required: true },
    text: { type: String, required: true },
});
export const Translation = mongoose.model("Translation", TranslationSchema);
