import { useState } from "react";
import { languageOptions } from "../TranslationsTable";
import { Language, createTranslation } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { isLanguage } from "../../utils";
import { useNotification } from "../NotificationContext";

export const Create = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const createMutation = useMutation({
    mutationFn: createTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
      showNotification("Translation created successfully", "success");
    },
    onError: (error: any) => {
      showNotification(
        `Error while creating translation: ${error.message}`,
        "error"
      );
    },
  });

  const handleSubmit = () => {
    createMutation.mutateAsync({ key, text, language });
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false);
    setKey("");
    setText("");
    setLanguage("en");
  };

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ margin: "1rem" }}
      >
        Create new translation
      </Button>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Create Translation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Key"
            type="text"
            fullWidth
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Translation"
            type="text"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              label="Language"
              onChange={({ target: { value } }) => {
                if (isLanguage(value)) setLanguage(value);
              }}
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!key || !text || !language}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
