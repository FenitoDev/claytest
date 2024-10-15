import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Translation, languageOptions } from "../TranslationsTable";
import { useState } from "react";
import { editTranslation } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isLanguage } from "../../utils";

export const Edit = ({ translation }: { translation: Translation }) => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState(translation.key);
  const [text, setText] = useState(translation.text);
  const [language, setLanguage] = useState(translation.language);

  const editMutation = useMutation({
    mutationFn: editTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
    },
  });

  const handleSubmit = () => {
    editMutation.mutateAsync({
      id: translation.id,
      key,
      text,
      language,
    });
    setModalOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="edit"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Edit Translation</DialogTitle>
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
            <InputLabel id="edit-language-select-label">Language</InputLabel>
            <Select
              labelId="edit-language-select-label"
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
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!key || !text || !language}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
