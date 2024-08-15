import { DeleteOutlined } from "@ant-design/icons";
import { deleteTranslation } from "../../api";

export const Delete = ({ id }: { id: String }) => (
  <DeleteOutlined
    style={{ color: "red" }}
    onClick={() => deleteTranslation(id)}
  />
);
