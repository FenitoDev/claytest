import "./App.css";
import { Create } from "./components/Actions/Create";
import { TranslationsTable } from "./components/TranslationsTable";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>Welcome to Clay's internationalization management system</p>
        </header>
      </div>
      <body>
        <Create />
        <TranslationsTable />
      </body>
    </>
  );
}

export default App;
