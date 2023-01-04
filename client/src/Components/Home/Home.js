import React, { useEffect, useState } from "react";
import * as actions from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./home.css";
import NavBar from "../navBar/NavBar";
import Pagination from "../pagination/Pagination";
import Order from "../Order/Order";
import Loading from "../loading/Loading";


export default function Home() {
  React.useEffect(() => {
    dispatch(actions.getPokemon());
    dispatch(actions.getTypes());
  }, [Order]);
  const pokemonSearch = useSelector((state) => state.pokemonSearch);
  const pokemons = useSelector((state) => state.pokemons);

  const dispatch = useDispatch();

  const [scrollHeight, setScrollHeight] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [scrollHeight]);
  return (
    <>
      {pokemons.length < 1 ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="home">
          <div className="cards"> <NavBar isScrolling={scrollHeight} />
          <PokemonCard />
          {pokemonSearch.length === 0  ? (
            <>
              <Pagination />
            </>
          ) : undefined}
          </div>
         
        </div>
      )}
    </>
  );
}
