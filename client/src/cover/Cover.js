import React from 'react';
import './Cover.css';
import video from '../media/PikachuAngry.webp'


const Cover = () => {

  return (
    <div className='cover-conteiner'>
        <img className='video' src={video} autoPlay loop muted alt='home'/>
          <a className='buttonHome' href='/home'> Welcome to the Wiki Pokemon's</a>
        <p></p>
    </div>
  )
}

export default Cover
