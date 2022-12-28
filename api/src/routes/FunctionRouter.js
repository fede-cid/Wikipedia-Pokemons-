const {
  getPokemon,
  getPokemonDbById,
  getAllPokemons,
  deletePokemon,
  getPokemonsDb,
  getPokemonApiById,
} = require("./ControllerPokemons");
const modelsT = require("./ControllerType");

const pokemons= () => async (req, res) => {
  try {
    let results = await getAllPokemons();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
};
const pokemonsByID = () => async (req, res) => {
  const { id } = req.params;
  const resultByApi = await getPokemonApiById(id);
  const resultByDB = await getPokemonDbById(id);

  if (resultByApi) {
    res.status(200).json(resultByApi);
  }
  if (resultByDB) {
    res.status(200).json(resultByDB);
  }
  if (!resultByApi && !resultByDB) {
    res.status(400).json({ msj: "No se encuentra el id solicitado" });
  }
};
module.exports = {
  pokemons,
  pokemonsByID,
};



const getPokemonApi = async () => {

  let pokes = await Pokemon.findAll();
if(pokes.length<1){
  const results = await axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=40`, {
      headers: {
        "Accept-Encoding": "identity",
      },
    })
    .then((r) => r.data.results);

    results.forEach((t) => pokes.push(t.id,
      t.name,
      t.types,
      t.image,
      t.attack,
      t.weight,
      t.height,));
 
    for (let i = 0; i < pokes.length; i++) {
      await Pokemon.create({
        id: pokeInfo[i].id,
        name: pokeInfo[i].name,
        types: pokeInfo[i].types.map((t) => t.type.name),
        image: pokeInfo[i].sprites.other['official-artwork'].front_default,
        attack: pokeInfo[i].stats[1].base_stat,
        weight: pokeInfo[i].weight,
        height: pokeInfo[i].height,
      });
    }
  
  let pokemonInfo = await Pokemon.findAll();
  return pokemonInfo;}
  return pokes
};





// .other["official-artwork"]