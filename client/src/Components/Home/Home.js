import React, { useEffect, useState } from "react";
import * as actions from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./home.css";
import NavBar from "../navBar/NavBar";

export default function Home() {
  let pokemonsPage = useSelector((state) => state.pokemonsTotalPage);
  const currentPage = useSelector((state) => state.currentPage);
  const pkpage = pokemonsPage;

  const dispatch = useDispatch();
  const page = [];
  while (pokemonsPage > 0) {
    page.unshift(pokemonsPage);
    pokemonsPage = pokemonsPage - 1;
  }

  React.useEffect(() => {
    dispatch(actions.getPokemon());
  }, []);


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
      
      <NavBar isScrolling={scrollHeight}/>
      <div className="targets"><PokemonCard /></div>
      
      <button
        className="button"
        disabled={currentPage == 1 ? true : false}
        onClick={() => dispatch(actions.actualPage(currentPage - 1))}
      >
        Previous
      </button>
      {"  "}
      <span className="button">...</span> {"  "}
      {page.map((e) => (
        <>
          <button
            className={
              currentPage == e
                ? "button-principal"
                : currentPage + 1 >= e && currentPage - 1 <= e
                ? "button"
                : "button-false"
            }
            onClick={() => dispatch(actions.actualPage(e))}
          >
            {e}
          </button>
          {"  "}
        </>
      ))}
      <span className="button">...</span>{" "}
      <button
        className="button"
        disabled={currentPage === pkpage ? true : false}
        onClick={() => dispatch(actions.actualPage(currentPage + 1))}
      >
        next
      </button>
    </div>
  );
}

// <button disabled= {actualPages == 1 ? true:false} className='button' onClick={() => dispatch(actions.getPagination(actualPages-1))}>PREVIOUS</button>
// {page.map(p => <button className={actualPages == p ? 'button-principal' : actualPages + 3 >= p && actualPages - 3 <= p ?  'button'  : "holi"} onClick={()=> dispatch(actions.getPagination(p))} >{actualPages + 3 >= p && actualPages - 3 <= p ?  p : "..." }</button>)}
