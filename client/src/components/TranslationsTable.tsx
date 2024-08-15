import { Table } from "antd";
import { Language, getTranslations } from "../api";
import { useEffect, useState } from "react";
import { Actions } from "./Actions/Actions";

export type Translation = {
  key: string;
  language: string;
  text: string;
  _id: string;
};

export const languageOptions = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
];

const columns = [
  { title: "Key", dataIndex: "key", key: "key" },
  { title: "Translation", dataIndex: "text", key: "text" },
  { title: "Language", dataIndex: "language", key: "language", width: "4rem" },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "id",
    width: "4rem",
    render: (_: undefined, translation: Translation) => (
      <Actions translation={translation} />
    ),
  },
];

export const TranslationsTable = ({
  selectedLanguage,
}: {
  selectedLanguage: Language;
}) => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTranslations = async () =>
      setTranslations(await getTranslations(selectedLanguage));
    if (
      (!translations.length && loading) ||
      (translations.length && translations[0].language !== selectedLanguage)
    ) {
      fetchTranslations();
      setLoading(false);
    }
  }, [translations, loading, selectedLanguage]);

  return <Table columns={columns} dataSource={translations} />;
};
