import { useState } from "react";
import "./App.css";
import { Create } from "./components/Actions/Create";
import {
  TranslationsTable,
  languageOptions,
} from "./components/TranslationsTable";
import { Select } from "antd";
import { Language } from "./api";

function App() {
  const [language, setLanguage] = useState<Language>("en");
  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>Welcome to Clay's internationalization management system</p>
        </header>
      </div>
      <body>
        <div>
          <Create />
          <Select
            options={languageOptions}
            value={language}
            onSelect={(e) => {
              if ((e: string): e is "es" | "en" => e === "es" || e === "en")
                setLanguage(e);
            }}
          />
        </div>
        <TranslationsTable selectedLanguage={language} />
      </body>
    </>
  );
}

export default App;
