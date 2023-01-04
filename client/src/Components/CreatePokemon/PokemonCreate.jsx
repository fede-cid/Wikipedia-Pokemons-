import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/Actions";
import { useNavigate } from "react-router-dom";
import "./PokemonCreate.css";

export function PokemonCreate() {
  const dispatch = useDispatch();
  const AllTypes = useSelector((state) => state.types);
  const navigate = useNavigate();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(actions.getTypes());
    dispatch(actions.getPokemon());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    weight: "",
    height: "",
    speed: "",
    types: [],
  });

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handlerFirstSelect = (e) => {
    if (input.types.length <= 1) {
      setInput({
        ...input,
        types: [e.target.value],
      });
    } else if (e.target.value === input.types[1]) {
      setInput({
        ...input,
        types: [e.target.value],
      });
    } else {
      setInput({
        ...input,
        types: [e.target.value, input.types[1]],
      });
    }
  };

  const handlerSecondSelect = (e) => {
    if (input.types.length === 0) {
      alert("Primero debes de escoger tu primer tipo");
      e.target.value = "DEFAULT";
      return;
    }
    if (e.target.value === "removeType") {
      setInput({
        ...input,
        types: [input.types[0]],
      });
    } else if (e.target.value === input.types[0]) {
      setInput({
        ...input,
        types: [input.types[0]],
      });
    } else {
      setInput({
        ...input,
        types: [input.types[0], e.target.value],
      });
    }
  };

  const handlerCreatePokemon = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(actions.postPokemon({ ...input, name: input.name.toLowerCase() }));
    alert(
      "Felicitaciones has creado un nievo pokemon ve y buscalo en nuestra base de datos para ver como es su nueva tarjeta"
    );
    setInput({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      weight: "",
      height: "",
      speed: "",
      types: [],
    });
    setTimeout(() => {
      navigate("/home");
    }, 900);
  };

  /**Errores */

  function validate(input) {
    let errors = {};
    if (
      allPokemons.find(
        (pokemon) => pokemon.name.toUpperCase() === input.name.toUpperCase()
      )
    ){
      errors.name = "Ya existe un pokemon con ese nombre, escoge otro!";}
    if (!input.name){
      errors.name = "Tu poke necesita un nombre, escoge el mejor";}
    if (/[1-9]/.test(input.name)){
      errors.name = "El nombre de tu poke no puede contener numeros";}
    if (/[\s]/.test(input.name)){
      errors.name = "El nombre de tu poke no puede contener espacios";}
    if (/[^\w\s]/.test(input.name)){
      errors.name =
        "El nombre de tu poke no puede contener caracteres especiales";}
    if (input.name[0] === " "){
      errors.name = "El primer caracter no puede ser un espacio";}
    if (input.hp > 150 || input.hp < 1 || !/\d/g.test(input.hp)){
      errors.hp = "El valor debe estar entre 1 y 150";}
    if (input.attack > 150 || input.attack < 1 || !/\d/g.test(input.attack)){
      errors.attack = "El valor debe estar entre 1 y 150 at";}
    if (input.defense > 150 || input.defense < 1 || !/\d/g.test(input.defense)){
      errors.defense = "El valor debe estar entre 1 y 150 def";}
    if (input.speed > 150 || input.speed < 1 || !/\d/g.test(input.speed)){
      errors.speed = "El valor debe estar entre 1 y 150 sp";}
    if (input.height > 150 || input.height < 1 || !/\d/g.test(input.height)){
      errors.height = "El valor debe estar entre 1 y 150";}
    if (input.weight > 150 || input.weight < 1 || !/\d/g.test(input.weight)){
      errors.weight = "El valor debe estar entre 1 y 150";}
    if (!/\.(jpg|png|gif)$/i.test(input.image)){
      errors.image = "La url que intentas colocar no es valida";}
    return errors;
  }
  const [errors, setErrors] = useState({});

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (
      input.name === "" ||
      /[1-9]/.test(input.name) ||
      /[\s]/.test(input.name) ||
      /[^\w\s]/.test(input.name) ||
      input.types.length < 1 ||
      input.hp.length < 1 ||
      input.attack.length < 1 ||
      input.defense.length < 1 ||
      input.speed.length < 1 ||
      input.height.length < 1 ||
      input.weight.length < 1
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [errors, input, setDisabledButton]);

  return (
    <div>
      <div>
        <div>
          <div></div>
          <form className="form">
            <h1>Crea tu Pokemon !</h1>
            <div>
              <div>
                <div>
                  <div>
                    <label className="label">Name:</label>
                    <input
                      // required
                      className="input-text"
                      type="text"
                      name="name"
                      value={input.name}
                      placeholder="Name..."
                      onChange={(e) => handlerChange(e)}
                      autoComplete="off"
                    />
                    <span class={"highlight"}></span>
                    <span class={"bar"}></span>
                    <div>{errors.name && <p>{errors.name}</p>}</div>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="label">Hp:</label>
                    <span value={input.hp}></span>
                    {/* <span>{input}</span> */}
                    <input
                    className="input-text"
                      type="range"
                      min="0"
                      max="150"
                      name="hp"
                      value={input.hp}
                      placeholder="Ejem: 12"
                      onChange={(e) => handlerChange(e)}
                    />
                    <span>{input.hp}</span>
                    <div>{errors.hp && <p>{errors.hp}</p>}</div>
                  </div>
                  <div>
                    <label className="label">Attack:</label>
                    <input
                    className="input-text"
                      type="range"
                      name="attack"
                      max="150"
                      value={input.attack}
                      placeholder="Ejem: 12"
                      onChange={(e) => handlerChange(e)}
                      autoComplete="off"
                    />
                    <span>{input.attack}</span>
                    <div>{errors.attack && <p>{errors.attack}</p>}</div>
                  </div>
                  <div>
                    <label className="label">Defense:</label>
                    <input
                    className="input-text"
                      type="range"
                      name="defense"
                      max="150"
                      value={input.defense}
                      placeholder="Ejem: 30"
                      onChange={(e) => handlerChange(e)}
                      autoComplete="off"
                    />
                    <span>{input.defense}</span>
                    <div>{errors.defense && <p>{errors.defense}</p>}</div>
                  </div>
                  <div>
                    <label className="label">Weight:</label>
                    <input
                    className="input-text"
                      type="range"
                      name="weight"
                      max="150"
                      value={input.weight}
                      placeholder="Ejem: 30"
                      onChange={(e) => handlerChange(e)}
                      autoComplete="off"
                    />
                    <span>{input.weight}</span>
                    <div>{errors.weight && <p>{errors.weight}</p>}</div>
                  </div>
                </div>
              </div>
              {/*SEGUNDA COLUMNA */}
              <div>
                <div c>
                  <label className="label">Height:</label>
                  <input
                  className="input-text"
                    type="range"
                    name="height"
                    max="150"
                    value={input.height}
                    placeholder="Ejem: 30"
                    onChange={(e) => handlerChange(e)}
                    autoComplete="off"
                  />
                  <span>{input.height}</span>
                  <div>{errors.height && <p>{errors.height}</p>}</div>
                </div>

                <div>
                  <label className="label">Speed:</label>
                  <input
                  className="input-text"
                    type="range"
                    name="speed"
                    max="150"
                    value={input.speed}
                    placeholder="Ejem: 30"
                    onChange={(e) => handlerChange(e)}
                    autoComplete="off"
                  />
                  <span>{input.speed}</span>
                  <div>{errors.speed && <p>{errors.speed}</p>}</div>
                </div>

                <div>
                  <label className="label">Imagen:</label>
                  <input
                  className="input-text"
                    type="text"
                    name="image"
                    value={input.image}
                    placeholder="Url de tu imagen..."
                    onChange={(e) => handlerChange(e)}
                    autoComplete="off"
                  />
                  <div>{errors.image && <p>{errors.image}</p>}</div>
                </div>
                <div>
                  <label className="label"> Type:</label>
                  <select
                    defaultValue={"DEFAULT"}
                    onChange={(e) => handlerFirstSelect(e)}
                  >
                    <option value="DEFAULT" disabled>
                      Select
                    </option>
                    {AllTypes &&
                      AllTypes.map((type) => {
                        return (
                          <option key={type.name} value={type.id}>
                            {type.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div>
                  <label className="label">Type:</label>
                  <select
                    defaultValue={"DEFAULT"}
                    onChange={(e) => handlerSecondSelect(e)}
                    required
                  >
                    <option value="DEFAULT" disabled>
                      Select
                    </option>
                    <option value="removeType">Remove second type</option>
                    {AllTypes &&
                      AllTypes.map((type) => {
                        return (
                          <option key={type.name} value={type.id}>
                            {type.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <button
              disabled={disabledButton}
              onClick={(e) => handlerCreatePokemon(e)}
            >
              CREAR POKEMON
            </button>
          </form>
        </div>
      </div>
      <button>{"<-"} VOLVER</button>
    </div>
  );
}

// llegue mariano