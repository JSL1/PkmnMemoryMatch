//singlecard.js
import React, { Component } from "react";
import { useState } from "react";

const SingleCard = (props) => {
  
  const handleClick = () => {
    if (!props.disabled) {
      props.func(props.card);
    } else {
      console.log('flipping is disabled.');
    }
  }
  
  return(
    <div className="card" key={props.card.id}>
      <div className={props.flipped ? "flipped" : ""}>
        <img className="front" src={props.card.src} />
        <img
          className="back"
          src="images/Poke_Ball.png"
          onClick={handleClick}
        />
      </div>
    </div>
  );
  
}

export default SingleCard;