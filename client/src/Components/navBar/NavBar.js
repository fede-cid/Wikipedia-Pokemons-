import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import * as actions from "../../Redux/Actions";
import Order from "../Order/Order";
import Music from "../Music/Music";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isScrolling }) => {
  const pokemonSearch = useSelector((state) => state.pokemonSearch);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    name.length > 0 && dispatch(actions.getPokemon(name.toLowerCase()));
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
          placeholder={
            error === 2
              ? "Pokemon not found"
              : error === 0
              ? "Search Pokemon's"
              : undefined
          }
        />
        <div>
          <Music />
        </div>

        {pokemonSearch.length > 0 ? "" : <Order />}
        <button className="buttonSearch" type="submit">
          Search
        </button>
        <button className="btn-create" onClick={() => navigate("/create")}>
          CREATE POKEMON
        </button>
      </form>
    </div>
  );
};

export default NavBar;
