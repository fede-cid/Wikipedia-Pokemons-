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
  const toTheTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination">
      <button
        className="button"
        disabled={currentPage === 1 ? true : false}
        onClick={() => {
          toTheTop();
          dispatch(actions.actualPage(currentPage - 1));
        }}
      >
        ◄
      </button>
      {"  "}
      {"  "}
      {page.map((e) => (
        <>
          <button
            className={
              currentPage === e
                ? "button-principal"
                : currentPage + 3 >= e && currentPage - 3 <= e
                ? "button"
                : "button-false"
            }
            onClick={() => {
              toTheTop();
              dispatch(actions.actualPage(e));
            }}
          >
            {e}
          </button>
        </>
      ))}{" "}
      <button
        className="button"
        disabled={currentPage === pkpage ? true : false}
        onClick={() => {
          toTheTop();
          dispatch(actions.actualPage(currentPage + 1));
        }}
      >
        ►
      </button>
    </div>
  );
}

export default Pagination;
