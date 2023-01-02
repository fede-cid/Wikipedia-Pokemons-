import React, { useState } from "react";
import * as actions from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import './Order.css'

function Order() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  React.useEffect(() => {
    dispatch(actions.getTypes());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(actions.reloadPokemons());
  }

  function handleFilterCreated(e) {
    dispatch(actions.filterCreated(e.target.value));
  }

  function handleFilterByType(e) {
    dispatch(actions.filterPokemonsByType(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(actions.orderByNameOrStrengh(e.target.value));
  }

  return (
    <div className="content-select">
      <select id="order" onChange={(e) => handleSort(e)}>
        <option value="normal">Normal</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
        <option value="HAttack">Highest Attack</option>
        <option value="LAttack">Lowest Attack</option>
      </select>
      <select id="url" onChange={(e) => handleFilterCreated(e)}>
        <option value="All">All</option>
        <option value="Api">API</option>
        <option value="Created">Created</option>
      </select>
      <select id="type" onChange={(e) => handleFilterByType(e)}>
        <option value="All">all types</option>
        {types.map((type) => (
          <option value={type.name} key={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Order;
