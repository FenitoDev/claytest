import { Translation } from "../TranslationsTable";
import { Delete } from "./Delete";
import { Edit } from "./Edit";

export const Actions = ({ translation }: { translation: Translation }) => {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Edit translation={translation} />
      <Delete id={translation.id} />
    </div>
  );
};
