import React from "react";
import "./Cover.css";
import image from "../media/PikachuAngry.webp";

const Cover = () => {
  return (
    <div className="cover-conteiner">
      <img className="video" src={image} autoPlay loop muted alt="home" />
      <a className="buttonHome" href="/home">
        {" "}
        <button className="bn3637 bn38">Welcome to the Wiki Pokemon's</button>
      </a>
      <p></p>
    </div>
  );
};

export default Cover;