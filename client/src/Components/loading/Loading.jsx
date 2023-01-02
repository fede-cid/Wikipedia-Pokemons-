import React from 'react'
import './Loading.css'
import image from "../media/loiding2.gif";

function Loading() {
  return (
    <div className="cover-conteiner">
      <img className="video" src={image} autoPlay loop muted alt="home" />
    </div>
  )
}

export default Loading
