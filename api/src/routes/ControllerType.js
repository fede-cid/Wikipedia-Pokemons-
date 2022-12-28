const { Router } = require("express");
const axios = require("axios");
const { Type } = require("../db");
const router = Router();
//----------------------ruta /types
//----------------------funcion para traer toda la info de la api y guardarla en nuestra base de datos

const getTypes = async () => {
  try {
    let types = await Type.findAll();

    if (types.length < 1) {

      const typeDB = await axios
        .get("https://pokeapi.co/api/v2/type", {
          headers: {
            "Accept-Encoding": "identity",
},
        })
        .then((r) => r.data.results);
        
      typeDB.forEach((t) => types.push(t.name));

      for (let i = 0; i < types.length; i++) {
        await Type.create({ name: types[i] });
      }
      let firstCharge = await Type.findAll();
      
      return firstCharge;
    }
    return types;
  } catch (error) {
    throw error;
  }
};
module.exports = { getTypes };

