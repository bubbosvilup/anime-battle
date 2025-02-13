import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import Characters from "./pages/Characters";
import Choice from "./pages/Choice";
import Battle from "./pages/Battle";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Set StartMenu as the homepage */}
        <Route path="/" element={<StartMenu />} />

        {/* Characters page */}
        <Route path="/characters" element={<Characters />} />

        {/* Other pages (if needed) */}
        <Route path="/choice" element={<Choice />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </Router>
  );
}
