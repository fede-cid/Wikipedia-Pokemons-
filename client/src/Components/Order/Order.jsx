import React from "react";
import * as actions from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import "./Order.css";

function Order() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  React.useEffect(() => {
    dispatch(actions.getTypes());
  }, []);
  const toTheTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(actions.filterCreated(e.target.value));
    toTheTop()
  }

  function handleFilterByType(e) {
    e.preventDefault();
    dispatch(actions.filterPokemonsByType(e.target.value));
    toTheTop()
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(actions.orderByFilter(e.target.value));
    toTheTop()
  }

  return (
    <div className="content-select">
      <select id="order" onChange={(e) => handleSort(e)}>
        <option value="normal">Normal</option>
        <option value="upward">A - Z</option>
        <option value="descendant">Z - A</option>
        <option value="HighAttack">Highest Attack</option>
        <option value="LowAttack">Lowest Attack</option>
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
