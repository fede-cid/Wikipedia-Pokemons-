import {
  GET_POKEMON,
  GET_POKEMON_DETAIL_ID,
  GET_POKEMON_DETAIL_NAME,
  CREATE_POKEMON,
  DELETE_POKEMON,
  GET_TYPE,
  TOTAL_PAGE,
  ACTUAL_PAGE,
  FILTER_BY_TYPES,
  FILTER_CREATED,
  ORDER_BY_NAME_OR_STRENGH,
  RELOAD_POKEMONS,
  POST_POKEMON,
  HOME,
} from "../Actions/index";

export const pokemonsPerPage = 12;

const initialState = {
  pokemons: [],
  pokemonsDetails: [],
  pokemonSearch: [],
  types: [],
  pokemonsTotalPage: 0,
  currentPage: 1,
  lastPage: 0,
  nextPage: 0,
  firstPokemonIndex: 0,
  lastPokemonIndex: 12,
  allPokemons: [],
  error: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
        pokemonSearch: [],
        allPokemons: action.payload,
        pokemonsTotalPage: Math.ceil(action.payload.length / pokemonsPerPage),
      };
    case RELOAD_POKEMONS:
      const apiPokesSort = state.allPokemons
        .filter((el) => !el.createdInDb)
        .sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (b.id > a.id) {
            return -1;
          }
          return 0;
        });
      const dbPokesSort = state.allPokemons
        .filter((el) => el.createdInDb)
        .sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (b.id > a.id) {
            return -1;
          }
          return 0;
        });
      let sortedArrayNormal = [...apiPokesSort, ...dbPokesSort];

      return {
        ...state,
        pokemons: sortedArrayNormal,
      };
    case POST_POKEMON:
      return {
        ...state,
      };

    case GET_POKEMON_DETAIL_ID:
      return {
        ...state,
        pokemonsDetails: action.payload,
      };
    case GET_POKEMON_DETAIL_NAME:
      let actualPokemon = action.payload;

      let err = 0;
      if (!actualPokemon) {
        actualPokemon = [];
        err = 2;
      }
      return {
        ...state,
        pokemonSearch: actualPokemon,
        error: err,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case DELETE_POKEMON:
      return {
        ...state,
      };
    case GET_TYPE:
      return {
        ...state,
        types: action.payload,
      };
    case TOTAL_PAGE:
      return {
        ...state,
        pokemonsTotalPage: action.payload,
      };
    case HOME:
      return {
        ...state,
        pokemonSearch: "",
      };
    case ACTUAL_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        firstPokemonIndex: pokemonsPerPage * (action.payload - 1),
        lastPokemonIndex: pokemonsPerPage * action.payload,
      };

    case FILTER_BY_TYPES:
      const allPokemons = state.allPokemons;
      const statusFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((el) => el.types.includes(action.payload));

      return {
        ...state,
        pokemons: statusFiltered.length ? statusFiltered : allPokemons,
        error: statusFiltered.length ? 0 : 1,
        pokemonsTotalPage: statusFiltered.length
          ? Math.ceil(statusFiltered.length / pokemonsPerPage)
          : Math.ceil(allPokemons.length / pokemonsPerPage),
        currentPage: 1,
      };

    case FILTER_CREATED:
      let allPokemons2 = state.allPokemons;
      let result;
      if (action.payload === "Created") {
        result = allPokemons2.filter((el) => el.id.length > 1);
      }
      if (action.payload === "All") {
        result = allPokemons2;
      }
      if (action.payload === "Api") {
        result = allPokemons2.filter((el) => typeof el.id === "number");
      }

      return {
        ...state,
        pokemons: result.length ? result : allPokemons2,
        currentPage: 1,
        error: result.length ? 0 : 1,
        pokemonsTotalPage: Math.ceil(result.length / pokemonsPerPage),
      };

    case ORDER_BY_NAME_OR_STRENGH:
      let sortedArray;

      if (action.payload === "upward") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "descendant") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "HighAttack") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack > a.attack) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "LowAttack") {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "normal") {
        const apiPokes = state.pokemons
          .filter((el) => !el.createdInDb)
          .sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (b.id > a.id) {
              return -1;
            }
            return 0;
          });

        sortedArray = [...apiPokes];
      }

      return {
        ...state,
        pokemons: sortedArray,
        pokemonsTotalPage: Math.ceil(sortedArray.length / pokemonsPerPage),
        currentPage: 1,
      };
    default:
      return state;
  }
};

export default rootReducer;
