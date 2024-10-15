import { useState } from "react";
import "./App.css";
import { Create } from "./components/Actions/Create";
import {
  TranslationsTable,
  languageOptions,
} from "./components/TranslationsTable";
import { Language } from "./api";
import { Select, MenuItem, Typography, Container, Box } from "@mui/material";
import { isLanguage } from "./utils";

function App() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <Container>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography>
          Welcome to GetAgil's internationalization management system
        </Typography>
      </Box>
      <Box>
        <Create />
        <Select
          value={language}
          onChange={({ target: { value } }) => {
            if (isLanguage(value)) setLanguage(value);
          }}
          displayEmpty
          sx={{ minWidth: 120, ml: 2 }}
        >
          {languageOptions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TranslationsTable selectedLanguage={language} />
    </Container>
  );
}

export default App;
