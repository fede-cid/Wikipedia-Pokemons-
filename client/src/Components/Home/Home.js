import React, { useEffect, useState } from "react";
import * as actions from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./home.css";
import NavBar from "../navBar/NavBar";
import Pagination from "../pagination/Pagination";
import Order from "../Order/Order";

export default function Home() {
  React.useEffect(() => {
    dispatch(actions.getPokemon());
    dispatch(actions.getTypes());
  }, [Order]);
  const pokemonSearch = useSelector((state) => state.pokemonSearch);

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
    <div className="home">
      <NavBar isScrolling={scrollHeight} />
      <div className="targets">
        <PokemonCard />
      </div>
      {pokemonSearch.length == 0 ? (
        <>
          <Pagination />
          <Order />
        </>
      ) : (
        <p>encontraste tu pokemon</p>
      )}
    </div>
  );
}

// <button disabled= {actualPages == 1 ? true:false} className='button' onClick={() => dispatch(actions.getPagination(actualPages-1))}>PREVIOUS</button>
// {page.map(p => <button className={actualPages == p ? 'button-principal' : actualPages + 3 >= p && actualPages - 3 <= p ?  'button'  : "holi"} onClick={()=> dispatch(actions.getPagination(p))} >{actualPages + 3 >= p && actualPages - 3 <= p ?  p : "..." }</button>)}
