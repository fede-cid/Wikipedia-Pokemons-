import React from 'react'
import './Loading.css'
import image from "../media/loiding2.gif";

function Loading() {
  return (
    <div className="cover-conteiner">
      <img className="video" src={image} autoPlay loop muted alt="home" />
      <span className="loader">Loading</span>
    </div>
  )
}

export default Loading
