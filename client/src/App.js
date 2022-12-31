import "./App.css";
import React from "react";
import Cover from "./Components/cover/Cover";
import Home from "./Components/Home/Home";
import PokemonDetail from "./Components/PokemonDetail/PokemonDetail";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Cover />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
