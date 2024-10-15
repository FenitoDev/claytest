import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { deleteTranslation } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../NotificationContext";

export const Delete = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const deleteMutation = useMutation({
    mutationFn: deleteTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
      showNotification("Translation deleted successfully", "success");
    },
    onError: (error) => {
      showNotification(
        `Error while deleting translation: ${error.message}`,
        "error"
      );
    },
  });
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this translation?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <IconButton aria-label="delete" color="error" onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};
