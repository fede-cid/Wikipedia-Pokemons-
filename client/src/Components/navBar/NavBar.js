import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import * as actions from "../../Redux/Actions";

const NavBar = ({ isScrolling }) => {
  const toTheTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
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

        <button className="buttonSearch" type="submit">
          Search
        </button>
      </form>

      <div className="navbar-logo" onClick={toTheTop}>
        {/* <Link to="/">Home</Link>
        <Link to="/character/create">Create Character</Link> */}
      </div>
    </div>
  );
};

export default NavBar;
