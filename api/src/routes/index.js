const { Router } = require("express");
const {
  getPokemonDBSearch,
  getAllPokemons,
  getPokemonApiSearch,
  deletePokemonByName,
  postCreatePokemon,
} = require("./ControllerPokemons");
const { getTypes } = require("./ControllerType");
const { Pokemon, Type } = require("../db");
const axios = require("axios");
const router = Router();

router.get("/pokemons", async (req, res) => {
  try {
    const {name} = req.query
    if(name){  const resultByApi = await getPokemonApiSearch(name);
      const resultByDB = await getPokemonDBSearch(undefined, name);
    
      if (resultByApi) {
        res.status(200).json(resultByApi);
      }
      if (resultByDB) {
        res.status(200).json(resultByDB);
      }
      if (!resultByApi && !resultByDB) {
        res
          .status(400)
          .json({ msj: `No se encuentra el Pokemon ${name} solicitado` });
      }
    }
    if(!name){
    let results = await getAllPokemons();
    res.status(200).json(results);}
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
  let { id, name, types, image, attack, weight, height, hp, speed, defense } =
    req.body;
  try {
    let createPokemon = await Pokemon.create({
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
    });
    const result = await postCreatePokemon(createPokemon);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ msj: `${error}` });
  }
});

router.delete("/pokemons/:name", async (req, res) => {
  let { name } = req.params;
  try {
    res.status(200).json(await deletePokemonByName(name));
    console.log(`Has eliminado el Pokemon ${name} exitosamnte`);
  } catch (error) {
    res.status(400).json({ msj: `${error}` });
  }
});

module.exports = router;
