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
            pokemons: action.payload,
          };
      case GET_POKEMON_DETAIL_ID:
        return {
          ...state,
          pokemonsDetails: action.payload,
        };
      case GET_POKEMON_DETAIL_NAME:
        return {
          ...state,
          pokemonsDetails: action.payload,
        };
      case CREATE_POKEMON:
        return {
          ...state,
          pokemons: [...state.pokemons, action.payload],
        };
      case DELETE_POKEMON:
        return {
          ...state,
          pokemons: state.pokemons.filter((c) => c.id !== action.payload),
        };
      case GET_TYPE:
        return {
          ...state,
          types: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;