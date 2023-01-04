import React from "react";
import * as actions from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./pokemonCard.css";

const PokemonCard = () => {
  const dispatch = useDispatch();
  const last = useSelector((state) => state.lastPokemonIndex);
  const first = useSelector((state) => state.firstPokemonIndex);
  const pokemonOne = useSelector((state) => state.pokemonSearch);
  const pokemons = useSelector((state) => state.pokemons);
 

  return (
    <>
      <div className="pokemons-container">
        { pokemonOne && pokemonOne.length !== 0 ? (
          <div className="box">
            <div className="card">
              <div id={`${pokemonOne.types[0].name}`} className={`imgBx`}>
                <a href={`/pokemons/${pokemonOne.id}`}>
                  <img src={pokemonOne.image} alt={pokemonOne.name} />
                </a>
              </div>
              <div className="details">
                <h2>
                  Name: {pokemonOne.name} Attack: {pokemonOne.attack}
                  <br></br>
                  <span>
                    Type:{" "}
                    {pokemonOne.types &&
                      pokemonOne.types.map((type) => {
                        return type.name + " ";
                      })}
                  </span>
                  <br></br>
                </h2>
              </div>
            </div>
            <div className="pokemon-search">
              <h1>Encontraste a tu pokemon {pokemonOne.name}</h1>
            </div>
            <button
              className="navbar-logo"
              onClick={() => dispatch(actions.getPokemon())}
            >
              {" "}
              HOME
            </button>
          </div>
        ) : (
          pokemons.slice(first, last).map((c,index) => (
            <div key={`${index}${c.id}`} className="box">
              <div className="card">
                <div id={`${c.types[0]}`} className={`imgBx `}>
                  <a href={`/pokemons/${c.id}`}>
                    <img src={c.image}  alt={c.name} />
                  </a>
                </div>
                <div className="details">
                  <h2>
                    Name: {c.name} Attack: {c.attack}
                    <br></br>
                    <span>Type: {c.id.length>1 ? c.types.map((type) => {
                        return type.name + " ";
                      }) : c.types.toString()}</span>
                    <br></br>
                  </h2>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default PokemonCard;
