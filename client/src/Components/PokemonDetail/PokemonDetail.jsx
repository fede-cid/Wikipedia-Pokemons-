import React from "react";
import * as actions from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./PokemonDetail.css";
import pokebola from "../media/pokebola.png";
import heart from "../media/heart.png";

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(actions.getPokemonDetailBYID(id));
  }, []);
const navigate = useNavigate()

  const pokeInfo = useSelector((state) => state.pokemonsDetails);

  return (
    <div>
      {pokeInfo && pokeInfo.length !== 0 ? (
        <div className="pokemons-details">
          <div className="wrapper">
            <h1>{pokeInfo.name}</h1>
            <p className="attack">{pokeInfo.attack}</p>
            <img className="pokebola" src={pokebola} alt="pokebola" />
            <div className="pokemon-cart">
              <div className="pokemon-cart-image">
                { <img 
                  className="pokemon-image"
                  src={pokeInfo.image}
                  alt={pokeInfo.name}
                />}
              </div>
              <div className="box-cart">
                <div className="info-pokemon">
                  <h2 className="type">
                    Types :{" "}
                    {pokeInfo.types &&
                      pokeInfo.types.map((type) => {
                        return type.name + "  ";
                      })}
                  </h2>
                  <h2 className="defense">Defense :{pokeInfo.defense}/150</h2>
                  <h2 className="speed">Speed : {pokeInfo.speed}/150</h2>
                  <h2 className="heart">
                    <img
                      src={heart}
                      className="heart-Img"
                      alt={pokeInfo.name}
                    />
                    {pokeInfo.hp}
                  </h2>
                  <h2 className="weight">Weight : {pokeInfo.weight} cmm</h2>
                  <h2 className="height">height : {pokeInfo.height} cmm</h2>
                </div>
              </div>
            </div>
          </div>
          <button
              className="navbar-logo"
              onClick={() => navigate('/home')}
            >
              HOME
            </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PokemonDetail;
