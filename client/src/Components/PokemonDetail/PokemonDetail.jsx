import React from "react";
import * as actions from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css";
import pokebola from '../media/pokebola.png'

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  React.useEffect(() => {
    dispatch(actions.getPokemonDetailBYID(id));
  }, []);

  const pokeInfo = useSelector((state) => state.pokemonsDetails);

  return (
    <div className="wrapper">
      <h1>{pokeInfo.name}</h1> 
      <p className="attack">{pokeInfo.attack}</p>
      <img className='pokebola'src={pokebola} alt='pokebola'/>
      <div className="pokemon-cart">
        <div className="pokemon-cart-image">
          <img
            className="pokemon-image"
            src={pokeInfo.image}
            alt={pokeInfo.name}
          />
        </div>
        <div className="box-cart">
          <div className="info-pokemon">
            <h2>Defense :{pokeInfo.defense}</h2>
            <p>
              Speed :{pokeInfo.speed} HP :{pokeInfo.hp}
            </p>
            <p>
              Weight :{pokeInfo.weight} height:{pokeInfo.height}
            </p>
            <p>
              Types :
              {pokeInfo.types &&
                pokeInfo.types.map((type) => {
                  return type.name + "...";
                })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
