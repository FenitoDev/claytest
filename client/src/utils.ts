import { Language } from "./api";

export const isLanguage = (value: string): value is Language =>
  value === "es" || value === "en";
