import React from "react";
import * as actions from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {  useParams } from "react-router-dom";



const PokemonDetail = () => {
  const dispatch = useDispatch();
const {id} = useParams()
console.log(id)
  React.useEffect(() => {
    dispatch(actions.getPokemonDetailBYID(id));
  }, []);

  const pokeInfo = useSelector((state) => state.pokemonsDetails);
 
  return (
    <>
      <figure>
        <img src={pokeInfo.image} alt={pokeInfo.name} />
      </figure>
      <div className="info-pokemon">
        <h2>{pokeInfo.name}</h2>
        <p>{pokeInfo.attack}</p>
        <p>{pokeInfo.weight}</p>
        <p>{pokeInfo.defense}</p>
        <p>{pokeInfo.speed}</p>
        <p>{pokeInfo.height}</p>
        <p>{pokeInfo.hp}</p>
        {pokeInfo.types &&
          pokeInfo.types.map((type) => {
            return <p>{type.name}</p>;
          })}
      </div>
    </>
  );
};

export default PokemonDetail;
