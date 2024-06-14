import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import FavouriteList from "./components/pokemon/FavouriteList"; // Import FavouriteList

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pokemon/:pokemonIndex" element={<Pokemon />} />
            <Route path="/favourites" element={<FavouriteList />} />{" "}
            {/* Add this route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
