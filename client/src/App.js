import "./App.css";
import React from "react";
import Cover from "./Components/cover/Cover";
import Home from "./Components/Home/Home";
import PokemonDetail from "./Components/PokemonDetail/PokemonDetail";
import { Route, Routes } from "react-router-dom";
import { PokemonCreate } from "./Components/CreatePokemon/PokemonCreate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Cover />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<PokemonDetail />} />
        <Route exact path="/create" element={<PokemonCreate />} />
      </Routes>
    </div>
  );
}

export default App;
