import React from "react";
import "./Music.css";
import audio from "./AtrapalosYa.mp3";
import image from '../media/atrapalosya_logo.png'

function Music() {
  return (
    <div>
      <div ><img className="logo-music" src={image} alt={'name'}/></div>
      <button className="player">
        <audio controls className="audio-player">
          <source src={audio} type="audio/mpeg" />
        </audio>
      </button>
    </div>
  );
}

export default Music;
