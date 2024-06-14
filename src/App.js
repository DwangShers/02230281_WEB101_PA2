import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated imports

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pokemon/:pokemonIndex" element={<Pokemon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
