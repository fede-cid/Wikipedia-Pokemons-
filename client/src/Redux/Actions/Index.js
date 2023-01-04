import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_DETAIL_ID = "GET_POKEMON_DETAIL_ID";
export const GET_POKEMON_DETAIL_NAME = "GET_POKEMON_DETAIL_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const GET_TYPE = "GET_TYPE";
export const TOTAL_PAGE = "TOTAL_PAGE";
export const ACTUAL_PAGE = "ACTUAL_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME_OR_STRENGH = "ORDER_BY_NAME_OR_STRENGH";
export const RELOAD_POKEMONS = "RELOAD_POKEMONS";
export const POST_POKEMON = "POST_POKEMON";
export const HOME = "HOME";
export const CLEAN_CACHE = "CLEAN_CACHE";

export const getPokemon = (name) => {
  if (name) {
    return async function (dispatch) {
      const result = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
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

export function postPokemon(payload) {
  return async function (dispatch) {
    console.log(payload)
    const pokemon = await axios.post("http://localhost:3001/pokemonsCreate", payload);

    return {
      type: POST_POKEMON,
      payload: pokemon,
    };
  };
}

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
    const result = await axios.get("http://localhost:3001/pokemons/type");
    return dispatch({
      type: GET_TYPE,
      payload: result.data,
    });
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

export function reloadPokemons() {
  return {
    type: "RELOAD_POKEMONS",
  };
}

export const deletePokemon = (payload) => {
  return {
    type: DELETE_POKEMON,
    payload: payload,
  };
};

export const actualPage = (payload) => {
  return { type: ACTUAL_PAGE, payload: payload };
};

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload: payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload: payload,
  };
}

export function orderByFilter(payload) {
  return {
    type: "ORDER_BY_NAME_OR_STRENGH",
    payload: payload,
  };
}
export function home() {
  return {
    type: "HOME",
  };
}

export function cleanCache() {
  return {
    type: "CLEAN_CACHE",
  };
}