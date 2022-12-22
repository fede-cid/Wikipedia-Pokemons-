import fetch from "node-fetch";
// /pokemons
// /pokemons/type
// /pokemonsName/:name
// /pokemonsId/:id
    export const GET_POKEMON = 'GET_POKEMON'
    export const GET_POKEMON_DETAIL_ID =  'GET_POKEMON_DETAIL_ID'
    export const GET_POKEMON_DETAIL_NAME = 'GET_POKEMON_DETAIL_NAME'
    export const CREATE_POKEMON = 'CREATE_POKEMON'
    export const DELETE_POKEMON = 'DELETE_POKEMON'
    export const GET_TYPE = 'GET_TYPE'

export const getPokemon = () => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/pokemons")
        .then((response) => response.json())
        .then((json) =>
          dispatch({
            type: GET_POKEMON,
            payload: json,
          })
        );
    };
  };
  
  export const getPokemonDetailBYID = (id) => {
    return async function (dispatch) {
      return fetch(`http://localhost:3001/pokemonsName/${id}`)
        .then((response) => response.json())
        .then((json) =>
          dispatch({
            type: GET_POKEMON_DETAIL_ID,
            payload: json,
          })
        );
    };
  };

  export const getPokemonDetailBYNAME = (name) => {
    return async function (dispatch) {
      return fetch(`http://localhost:3001/pokemonsId/${name}`)
        .then((response) => response.json())
        .then((json) =>
          dispatch({
            type: GET_POKEMON_DETAIL_NAME,
            payload: json,
          })
        );
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

