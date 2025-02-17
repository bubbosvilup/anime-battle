import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import Characters from "./pages/Characters";
import Choice from "./pages/Choice";
import Battle from "./pages/Battle";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<StartMenu />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
