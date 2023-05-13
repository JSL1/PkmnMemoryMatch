import { useState } from "react";
import './App.css';
import Header from './components/Header';
import Game from './components/Game';
import Footer from './components/Footer';


function App() {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [misses, setMisses] = useState(0);
  
  const scorePoint = () => {
    setScore(score + 1);
    if (score >= maxScore) {
      setMaxScore(score);
    }
  }
  
  const resetScore = () => {
    setScore(0);
    setMisses(0);
  }
  
  const missGuess = () => {
    setMisses(misses + 1);
  }
  
  return (
    <div className="App">
      <Header score={score} maxScore={maxScore}/>
      <Game
        scorePoint={scorePoint}
        resetScore={resetScore}
        misses={misses}
        missGuess={missGuess}
      />
      <Footer />
    </div>
  );
}

export default App;
