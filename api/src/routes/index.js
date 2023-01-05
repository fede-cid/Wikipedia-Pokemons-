const { Router } = require("express");
const {
  getPokemonDBSearch,
  getAllPokemons,
  getPokemonApiSearch,
  deletePokemonByName,
  
} = require("./ControllerPokemons");
const { getTypes } = require("./ControllerType");
const { Pokemon, Type } = require("../db");
const axios = require("axios");
const router = Router();

router.get("/pokemons", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const resultByApi = await getPokemonApiSearch(name);
      const resultByDB = await getPokemonDBSearch(undefined, name);

      if (resultByApi) {
        res.status(200).json(resultByApi);
      }
      if (resultByDB) {
        res.status(200).json(resultByDB);
      }
      if (!resultByApi && !resultByDB) {
        
        res
          .status(204)
          .json({ msj: `No se encuentra el Pokemon ${name} solicitado` });
      }
    }
    if (!name) {
      let results = await getAllPokemons();
      res.status(200).json(results);
    }
    // res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: "error" });
  }
});
router.get("/pokemons/type", async (req, res) => {
  try {
    const result = await getTypes();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ msj: `${error}` });
  }
});

router.get("/pokemonsId/:id", async (req, res) => {
  const { id } = req.params;
  const resultByApi = await getPokemonApiSearch(id);
  const resultByDB = await getPokemonDBSearch(id);

  if (resultByApi) {
    res.status(200).json(resultByApi);
  }
  if (resultByDB) {
    res.status(200).json(resultByDB);
  }
  if (!resultByApi && !resultByDB) {
    res.status(400).json({ msj: `No se encuentra el ${id} solicitado` });
  }
});

router.post("/pokemonsCreate", async (req, res) => {
  try{
  const { 
    name,
    types,
    image,
    attack,
    weight,
    height,
    hp,
    speed,
    defense
     
	} = req.body;
console.log('estoy aca' ,types)
  const pokemonCreated = await Pokemon.create({
  name,
  image,
  attack,
  weight,
  height,
  hp,
  speed,
  defense
     
  })
  console.log(types)
  const pokemonTypes = await Type.findAll({
    where: { id: types }
  })

  pokemonCreated.addType(pokemonTypes)
  return res.send('Pokemon created successfuly')
  } catch (error) {
    res.status(400).json({ msj: `${error}` })
  }
});

router.delete("/pokemonsDelete/", async (req, res) => {
  let { name } = req.query;
  try {
     await deletePokemonByName(name)
    res.status(200).json(`Has eliminado el Pokemon ${name} exitosamnte`);
    console.log(`Has eliminado el Pokemon ${name} exitosamnte`);
  } catch (error) {
    res.status(400).json({ msj: `${error}` });
  }
});

module.exports = router;
