

import {
  GET_POKEMON,
  GET_POKEMON_DETAIL_ID,
  GET_POKEMON_DETAIL_NAME,
  CREATE_POKEMON,
  DELETE_POKEMON,
  GET_TYPE,
  TOTAL_PAGE,
  ACTUAL_PAGE,
  // NEXT_PAGE,
  // PREV_PAGE,
    
} from "../Actions/index";

export const pokemonsPerPage = 12

const initialState = {
  pokemons: [],
  pokemonsDetails: [],
  pokemonSearch:[],
  types:[],
  pokemonsTotalPage:0,
  currentPage:1,
  lastPage:0,
  nextPage:0,
  firstPokemonIndex:0,
  lastPokemonIndex:12,
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_POKEMON:
          return {
            ...state,
            pokemons: action.payload,
            pokemonsTotalPage:Math.ceil(action.payload.length/pokemonsPerPage)
          };
      case GET_POKEMON_DETAIL_ID:
        return {
          ...state,
          pokemonsDetails: action.payload,
          
        };
      case GET_POKEMON_DETAIL_NAME:
        return {
          ...state,
          pokemonSearch: action.payload,
          pokemonsTotalPage:Math.ceil(action.payload.length/pokemonsPerPage)
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
        case TOTAL_PAGE: 
      return {
        ...state,
        pokemonsTotalPage:action.payload
      }
      case ACTUAL_PAGE:
        return {
            ...state,
            currentPage:action.payload,
            lastPage:action.payload-1,  
            nextPage:action.payload+1,
            firstPokemonIndex: (pokemonsPerPage * (action.payload -1)) ,
            lastPokemonIndex: pokemonsPerPage * action.payload,
        }

      default:
        return state;
    }
  };
  
  export default rootReducer;