import { Translation } from "../components/TranslationsTable";

const API_URL = process.env.REACT_APP_API_URL;

export type Language = "en" | "es";
type CreateTranslation = { language: Language; key: String; text: String };

if (!API_URL) throw new Error("API URL not found");

export const createTranslation = async (body: CreateTranslation) => {
  try {
    const res = await fetch(API_URL + "/api/translations/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "no-cors",
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTranslations = async (lang: Language = "en") => {
  try {
    const res = await fetch(API_URL + "/api/translations/" + lang, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "no-cors",
      },
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const editTranslation = async (translation: Translation) => {
  try {
    const res = await fetch(API_URL + "/api/translations/" + translation._id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "no-cors",
      },
      body: JSON.stringify(translation),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTranslation = async (id: String) => {
  try {
    const res = await fetch(API_URL + "/api/translations/" + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "no-cors",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
