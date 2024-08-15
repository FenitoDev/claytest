import { EditOutlined } from "@ant-design/icons";
import { Translation, languageOptions } from "../TranslationsTable";
import { useState } from "react";
import { Input, Modal, Select } from "antd";
import { editTranslation } from "../../api";

export const Edit = ({ translation }: { translation: Translation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState(translation.key);
  const [text, setText] = useState(translation.text);
  const [language, setLanguage] = useState(translation.language);

  return (
    <>
      <Modal
        open={modalOpen}
        title="Edit translation"
        closable={false}
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          editTranslation({ _id: translation._id, key, text, language });
          setModalOpen(false);
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
          onSelect={(e) => setLanguage(e)}
        />
      </Modal>
      <EditOutlined onClick={() => setModalOpen(true)} />
    </>
  );
};
