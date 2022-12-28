import React from "react";
import * as actions from "../../redux/actions";
import * as ReactRedux from "react-redux";

// Importar las actions como Object Modules, sino los test no funcionarán!

// Fijense en los test que SI O SI tiene que ser un functional component, de otra forma NO VAN A PASAR LOS TEST
// Deben usar Hooks para que los test pasen.
// No realicen un destructuring de ellos, sino que utilicenlos de la siguiente forma 'React.useState' y 'React.useEffect' ,
// Si no lo hacen asi los test no van a correr.

const CreateCharacter = () => {
  const [input, setInput] = React.useState({
    name: "",
    race: "",
    role: "",
    faction: "",
    ship: {
      name: "",
    },
  });

  const onHandleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleShip = (s) => {
    setInput({
      ...input,
      [s.target.name]: { name: s.target.value },
    });
  };

  const dispatch = ReactRedux.useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createCharacter(input));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Name: </label>
      <input type="text" name="name" onChange={onHandleChange} />
      <label>Race: </label>
      <input type="text" name="race" onChange={onHandleChange} />
      <label>Faction: </label>
      <input type="text" name="faction" onChange={onHandleChange} />
      <label>Role: </label>
      <input type="text" name="role" onChange={onHandleChange} />
      <label>Ship: </label>
      <input type="text" name="ship" onChange={onHandleShip} />
      <button type="submit">Create Character</button>
    </form>
  );
};
export default CreateCharacter;
