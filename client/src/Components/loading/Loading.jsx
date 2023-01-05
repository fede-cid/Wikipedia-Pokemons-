import React from "react";
import "./Loading.css";
import image from "../media/loiding2.gif";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions";

function Loading() {
  const dispatch = useDispatch();

  return (
    <div className="cover-conteiner">
      <img className="video" src={image} autoPlay loop muted alt="home" />
      <span className="loader">Loading</span>
      <button
        className="btn-reload"
        onClick={() => dispatch(actions.getPokemon())}
      >
        RELOAD
      </button>
    </div>
  );
}

export default Loading;
