//Game.js
import React, { Component } from "react";
import { useState, useEffect } from "react";
import uniqid from 'uniqid';
import SingleCard from "./singlecard";

const cardImages = [
  {"src": "images/charmander.png", matched: false },
  {"src": "images/cloyster.png", matched: false },
  {"src": "images/kingler.png", matched: false },
  {"src": "images/machop.png", matched: false },
  {"src": "images/slowpoke.png", matched: false },
  {"src": "images/tauros.png", matched: false },
];

const Game = (props) => {
  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: uniqid() }));
    
    setCards(shuffledCards);
    setTurns(0);
  }
  
  //new game
  const newGame = () => {
    shuffleCards();
    props.resetScore();
  }
  
  
  //handle choice
  const handleChoice = (card) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  }
  
  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      console.log('two cards selected');
      if (choiceOne.src === choiceTwo.src) {
        console.log('those cards match');
        props.scorePoint();
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log('those cards don\'t match');
        props.missGuess();
        if (props.misses == 9) {
          setTimeout(() => newGame(), 500);
        } else {
          setTimeout(() => resetTurn(), 500);
        }
      }
    }
  }, [choiceOne, choiceTwo])
  
  //reset choices & increase turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }
  
  //start a new game automatically
  useEffect(() => {
    newGame();
  }, []);
  
  const displayMisses = () => {
    let msarray = [];
    for (let i = 0; i < props.misses; i++) {
      msarray.push(
        <p className="redx">
          X
        </p>
      );
    }
    return msarray;
  }
  
  return (
    <div id="game">
      <p> Misses: {props.misses} </p>
      {displayMisses()}
      <div className="card-grid">
        {cards.map(card =>  (
          <SingleCard
            card={card}
            func={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <button onClick={newGame}>New Game</button>
    </div>
  );
  
}

export default Game;