import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import * as actions from "../../Redux/Actions";
import Order from "../Order/Order";
import Music from "../Music/Music";

const NavBar = ({ isScrolling }) => {
  const pokemonSearch = useSelector((state) => state.pokemonSearch);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    name.length > 0 && dispatch(actions.getPokemon(name));
  };

  function onInputChange(e) {
   
    setName(e.target.value);
  }

  return (
    <div className={`navbar ${isScrolling > 20 ? "scrolling" : null}`}>
      <form onSubmit={handleSubmit}>
        <input
          className="inputSearch"
          type="text"
          onChange={onInputChange}

          value={name}
          placeholder="Search POKEMONS"
        />
        <div className="music"><Music/></div>
        {pokemonSearch.length > 0 ? "" : <Order />}
        <button className="buttonSearch" type="submit" onClick={()=>dispatch(actions.home())}>
          Search
        </button>
      </form>
    </div>
  );
};

export default NavBar;
