const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },     
    id: {
      type: DataTypes.UUID, // clave aleatoria unica
      primaryKey: true,
      allowNull: false, // CAMPO OBLIGATORIO
      defaultValue: DataTypes.UUIDV4,//Un identificador universal único predeterminado generado siguiendo el estándar UUID v4
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    }
  }  , {
   timestamps:false
  });
};
