import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FlavorFusion from "./pages/FlavorFusion";
import TrendWeaver from "./pages/TrendWeaver";
import TasteQuill from "./pages/TasteQuill";
import NotFound from "./pages/NotFound";

// Import styles
import "./styles/main.css";
import "./styles/flavor-fusion.css";
import "./styles/flavor-fusion-buttons.css";
import "./styles/flavor-fusion-map.css"; // Import the new map CSS file
import "./styles/leaflet.css"; // Import our custom Leaflet CSS
import "./styles/flavor-fusion-features-1.css";
import "./styles/flavor-fusion-features-2.css";
import "./styles/flavor-fusion-features-3.css";
import "./styles/flavor-fusion-features-4.css";
import "./styles/flavor-fusion-features-5.css";
import "./styles/trend-weaver.css";
import "./styles/taste-quill.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavor-fusion" element={<FlavorFusion />} />
            <Route path="/trend-weaver" element={<TrendWeaver />} />
            <Route path="/taste-quill" element={<TasteQuill />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
