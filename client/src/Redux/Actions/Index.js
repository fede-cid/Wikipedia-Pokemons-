
import axios from "axios";
// /pokemons
// /pokemons/type
// /pokemonsName/:name
// /pokemonsId/:id
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_DETAIL_ID = "GET_POKEMON_DETAIL_ID";
export const GET_POKEMON_DETAIL_NAME = "GET_POKEMON_DETAIL_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const GET_TYPE = "GET_TYPE";
export const TOTAL_PAGE = "TOTAL_PAGE"
export const ACTUAL_PAGE = "ACTUAL_PAGE"
export const PREV_PAGE = "PREV_PAGE"
export const NEXT_PAGE = "NEXT_PAGE"





export const getPokemon = (name) => {
  if(name){
    return async function (dispatch) {
      const result = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: GET_POKEMON_DETAIL_NAME,
        payload: result.data,
      });
    };
  }
  return async function (dispatch) {
    const result = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_POKEMON,
      payload: result.data,
    });
  };
};

export const getPokemonDetailBYID = (id) => {
  return async function (dispatch) {
    const result = await axios.get(`http://localhost:3001/pokemonsId/${id}`);
    return dispatch({
      type: GET_POKEMON_DETAIL_ID,
      payload: result.data,
    });
  };
};


export const getTypes = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/pokemons/type")
      .then((response) => response.json())
      .then((types) =>
        dispatch({
          type: GET_TYPE,
          payload: types.map((s) => s.type),
        })
      );
  };
};

export const createPokemon = (payload) => {
  return {
    type: CREATE_POKEMON,
    payload: {
      ...payload,
    },
  };
};

export const deletePokemon = (payload) => {
  return {
    type: DELETE_POKEMON,
    payload: payload,
  };
};

export const actualPage = (payload) => {
 return { type:ACTUAL_PAGE,
  payload:payload
}}

// export const previousPage = (payload) => {
//  return { type:PREV_PAGE,
//   payload:payload-1
// }}

// export const nextPage = (payload) => {
//  return { type:NEXT_PAGE,
//   payload:payload+1

// }}


