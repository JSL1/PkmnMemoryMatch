// header.js
import React, { Component } from "react";

const Header = (props) => {

  return (
    <div id="header">
      <div className="header-flex">
        <img src="images/pkmnlogo.png" className="logo" />
      </div>
      <div className="header-flex">
        <h3>Score: {props.score} || Best: {props.maxScore}</h3>
      </div>
    </div>
  );
}

export default Header;