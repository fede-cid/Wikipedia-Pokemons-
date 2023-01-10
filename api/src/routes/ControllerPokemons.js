const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const e = require("express");
const router = Router();
//-----------------------ruta /pokemons
//-----------------------funcion para el llamado de la api
const getPokemonApi = async () => {
  const results = await axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=150`, {
      headers: {
        "Accept-Encoding": "identity",
      },
    })
    .then((r) => r.data.results);

  const pokemonInfo = [];

  for (let i = 0; i < results.length; i++) {
    const pokemons = await axios.get(results[i].url, {
      headers: {
        "Accept-Encoding": "identity",
      },
    });

    const pokeInfo = pokemons.data;
    pokemonInfo.push({
      id: pokeInfo.id,
      name: pokeInfo.name,
      types: pokeInfo.types.map((t) => t.type.name),
      image: pokeInfo.sprites.other["official-artwork"].front_default,
      attack: pokeInfo.stats[1].base_stat,
    });
  }
  return pokemonInfo;
};

//-----------------------funcion para el llamado a la base de datos
const getPokemonsDb = async () => {
  try {
    const PokemonsDb = await Pokemon.findAll({
      include: {
        attributes: ["name"],
        model: Type,
        through: {
          attributes: [],
        },
      },
    });
    return PokemonsDb;
  } catch (error) {
    return error;
  }
};
//-----------------------funcion de concatenado de los pokemons llamados por api y por DB(donde se conectan getPokemon,getPokemonsDb)
const getAllPokemons = async () => {
  try {
    let apiPokemons = await getPokemonApi();
    let dbPokemons = await getPokemonsDb();
    return apiPokemons.concat(dbPokemons);
  } catch (error) {
    throw error;
  }
};
//------------------------ruta /pokemons/:id
//------------------------funcion para traer al pokemon por su id en el llamado a la api
const getPokemonApiSearch = async (id, name) => {
  try {
    const searchPokemonsApi = await axios.get(
      ` https://pokeapi.co/api/v2/pokemon/${id}`,
      {
        headers: {
          "Accept-Encoding": "identity",
        },
      }
    );

    if (name) {
      searchPokemonsApi = await axios.get(
        ` https://pokeapi.co/api/v2/pokemon/${name}`
      );
    }

    if (searchPokemonsApi) {
      let pokeInfo = searchPokemonsApi;

      return {
        id: pokeInfo.data.id,
        name: pokeInfo.data.name,
        image: pokeInfo.data.sprites.other["official-artwork"].front_default,
        hp: pokeInfo.data.stats[0].base_stat,
        attack: pokeInfo.data.stats[1].base_stat,
        defense: pokeInfo.data.stats[2].base_stat,
        speed: pokeInfo.data.stats[3].base_stat,
        height: pokeInfo.data.height,
        weight: pokeInfo.data.weight,
        types: pokeInfo.data.types.map((t) => {
          return { name: t.type.name };
        }),
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
//----------------------------funcion para traer el pokemon buscandolo en nuestra base de datos
const getPokemonDBSearch = async (id, name) => {
  try {
    if (name) {
      const searchPokemon = await Pokemon.findOne({
        where: {
          name: name,
        },
        include: {
          attributes: ["name"],
          model: Type,
        },
      });
      return searchPokemon;
    }

    if (id) {
      const searchPokemon = await Pokemon.findOne({
        where: {
          id: id,
        },
        include: {
          attributes: ["name"],
          model: Type,
        },
      });
      return searchPokemon;
    }
  } catch (error) {
    return null;
  }
};
//----------------------------ruta /pokemons
//----------------------------funcion para crear el pokemon en el post /pokemons
const postCreatePokemon = async (
  id,
  name,
  types,
  image,
  attack,
  weight,
  height,
  hp,
  speed,
  defense
) => {
  return {
    id,
    name,
    types,
    image,
    attack,
    weight,
    height,
    hp,
    speed,
    defense,
  };
};
//----------------------------/pokemons/:name
//----------------------------funcion para eliminar los pokemons creados
const deletePokemonByName = async (name) => {
  await Pokemon.destroy({
    where: {
      name: name,
    },
  });
};

module.exports = {
  getPokemonApi,
  getPokemonDBSearch,
  getAllPokemons,
  deletePokemonByName,
  getPokemonsDb,
  getPokemonApiSearch,
  postCreatePokemon,
};
