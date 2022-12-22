import {
  GET_POKEMON,
  GET_POKEMON_DETAIL_ID,
  GET_POKEMON_DETAIL_NAME,
  CREATE_POKEMON,
  DELETE_POKEMON,
  GET_TYPE,
} from "../Actions";

const initialState = {
  pokemons: [],
  pokemonsDetails: {},
  types:[]
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POKEMON:
        return {
          ...state,
          characterDetail: action.payload,
        };
      case GET_POKEMON_DETAIL_ID:
        return {
          ...state,
          characters: action.payload,
        };
      case GET_POKEMON_DETAIL_NAME:
        return {
          ...state,
          characters: action.payload,
        };
      case CREATE_POKEMON:
        return {
          ...state,
          characters: [...state.characters, action.payload],
        };
      case DELETE_POKEMON:
        return {
          ...state,
          characters: state.characters.filter((c) => c.id !== action.payload),
        };
      case GET_TYPE:
        return {
          ...state,
          ships: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;