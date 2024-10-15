import { Translation } from "../components/TranslationsTable";

const API_URL = process.env.REACT_APP_API_URL;

export type Language = "en" | "es";
type CreateTranslation = { language: Language; key: String; text: String };

if (!API_URL) throw new Error("API URL not found");

export const createTranslation = async (body: CreateTranslation) => {
  const res = await fetch(API_URL + "/api/translations/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "no-cors",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error creating translation");
  }
  return res.json();
};

export const getTranslations = async (lang: Language = "en") => {
  const res = await fetch(API_URL + "/api/translations/" + lang, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "no-cors",
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching translations");
  }
  return res.json();
};
export const editTranslation = async (translation: Translation) => {
  const res = await fetch(API_URL + "/api/translations/" + translation.id, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "no-cors",
    },
    body: JSON.stringify(translation),
  });
  if (!res.ok) {
    throw new Error("Error editing translation");
  }
  return res.json();
};

export const deleteTranslation = async (id: string) => {
  const res = await fetch(API_URL + "/api/translations/" + id, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.text();
};
