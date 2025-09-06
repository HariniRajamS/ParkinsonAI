import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConnectomesPage from "./pages/ConnectomesPage";
import ScribblesPage from "./pages/ScribblesPage";
import ImagesPage from "./pages/ImagesPage";
import SpectrogramsPage from "./pages/SpectrogramsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connectomes" element={<ConnectomesPage />} />
        <Route path="/scribbles" element={<ScribblesPage />} />
        <Route path="/images" element={<ImagesPage />} />
        <Route path="/spectrograms" element={<SpectrogramsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
