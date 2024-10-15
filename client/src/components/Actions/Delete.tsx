import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { deleteTranslation } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Delete = ({ id }: { id: String }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
    },
  });
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this translation?")) {
      deleteMutation.mutateAsync(id);
    }
  };

  return (
    <IconButton aria-label="delete" color="error" onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};
