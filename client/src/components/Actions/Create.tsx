import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select } from "antd";
import { useState } from "react";
import { languageOptions } from "../TranslationsTable";
import { createTranslation } from "../../api";

export const Create = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<"en" | "es">("en");

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        style={{ margin: "1rem" }}
        icon={<PlusCircleOutlined />}
      >
        Create new translation
      </Button>

      <Modal
        open={modalOpen}
        title="Create translation"
        closable={false}
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          createTranslation({ key, text, language });
          setModalOpen(false);
          setKey("");
          setText("");
        }}
        okButtonProps={{ disabled: !key || !text || !language }}
      >
        <Input
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ marginTop: "1rem" }}
        />
        <Input
          placeholder="Translation"
          value={text}
          style={{ marginTop: "1rem" }}
          onChange={(e) => setText(e.target.value)}
        />
        <Select
          value={languageOptions.find(({ value }) => value === language)?.label}
          options={languageOptions}
          style={{ minWidth: "8rem", marginTop: "1rem" }}
          onSelect={(e) => {
            if ((e: string): e is "es" | "en" => e === "es" || e === "en")
              setLanguage(e as typeof language);
          }}
        />
      </Modal>
    </>
  );
};
