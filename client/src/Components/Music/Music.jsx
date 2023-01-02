import React from "react";
import "./Music.css";
import audio from "./AtrapalosYa.mp3";
import image from '../media/atrapalosya_logo.png'

function Music() {
  return (
    <div>
      <div ><img className="logo-music" src={image}/></div>
      <button className="player">
        <audio controls>
          <source src={audio} type="audio/mpeg" />
        </audio>
      </button>
    </div>
  );
}

export default Music;
