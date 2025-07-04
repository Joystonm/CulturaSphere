import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FlavorFusion from './pages/FlavorFusion';
import TrendWeaver from './pages/TrendWeaver';
import TasteQuill from './pages/TasteQuill';
import NotFound from './pages/NotFound';
import './styles/main.css';

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
