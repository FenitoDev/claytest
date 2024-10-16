import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Language, getTranslations } from "../api";
import { Actions } from "./Actions/Actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export type Translation = {
  key: string;
  language: Language;
  text: string;
  id: string;
};

export const languageOptions = [
  { label: "English", value: "en" as const },
  { label: "Español", value: "es" as const },
];

const columns = ["Key", "Translation", "Language", "Actions"];

export const TranslationsTable = ({
  selectedLanguage,
}: {
  selectedLanguage: Language;
}) => {
  const queryClient = useQueryClient();
  const { data: translations = [], isLoading } = useQuery<Translation[], Error>(
    {
      queryKey: ["translations"],
      queryFn: () => getTranslations(selectedLanguage),
    }
  );
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["translations"],
    });
  }, [selectedLanguage, queryClient]);
  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <CircularProgress sx={{ m: 2 }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {translations?.map((translation) => (
              <TableRow key={translation.id}>
                <TableCell>{translation.key}</TableCell>
                <TableCell>{translation.text}</TableCell>
                <TableCell>{translation.language.toUpperCase()}</TableCell>
                <TableCell>
                  <Actions translation={translation} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
