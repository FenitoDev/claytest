import { Translation } from "../TranslationsTable";
import { Delete } from "./Delete";
import { Edit } from "./Edit";

export const Actions = ({ translation }: { translation: Translation }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
      <Edit translation={translation} />
      <Delete id={translation._id} />
    </div>
  );
};
