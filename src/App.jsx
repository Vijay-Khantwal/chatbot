import { useState } from "react";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;