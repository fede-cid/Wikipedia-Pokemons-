import "./pagination.css";
import React from "react";
import * as actions from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

function Pagination() {
  let pokemonsPage = useSelector((state) => state.pokemonsTotalPage);
  const currentPage = useSelector((state) => state.currentPage);
  const pkpage = pokemonsPage;

  const dispatch = useDispatch();
  const page = [];
  while (pokemonsPage > 0) {
    page.unshift(pokemonsPage);
    pokemonsPage = pokemonsPage - 1;
  }
  return (
    <div>
      <button
        className="button"
        disabled={currentPage === 1 ? true : false}
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
              currentPage === e
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

export default Pagination;
