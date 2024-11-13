export { App };
import { Card } from "./components/Card";
import { useState, useRef, useEffect } from "react";

let characters = [
  {name: "lain", isClicked: false},
  {name: "nayuta", isClicked: false},
  {name: "yoru", isClicked: false},
  {name: "hoodiegirl", isClicked: false},
  {name: "manhwagirl", isClicked: false},
  {name: "sketchgirl", isClicked: false}
]

function App() {
  const [result, setResult] = useState(null);
  const [r, triggerRender] = useState(0);
  const score = useRef(0);
  const bestScore = useRef(0);
  const cardsChosen = useRef(0);
  const gamesWon = useRef(0);

  //process lose/win result
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      switch (result) {
        case "win":
          gamesWon.current += 1;
          resetGame();
          setTimeout(() => alert("You win! Play again?"), 0);
          setResult(null);
          break;
        case "lose":
          setTimeout(() => alert("You lose. Play again?"), 0);
          setResult(null);
          resetGame();
          break;
      }
    }

    return () => {
      ignore = true;
    }
  });

  //shuffle cards
  const shuffle = () => {
    let newCopy = [];
    const randomNums = (() => {
      let nums = [];
      while (nums.length < characters.length) {
        const num = Math.floor(Math.random()*10);
        if (num < characters.length && !nums.includes(num)) {
          nums.push(num);
        }
      }
      return nums;
    })();
    
    for (let randomNum of randomNums) {
      newCopy.push(characters[randomNum]);
    }
    characters = newCopy;
    triggerRender(r + 1);
  }

  //reset the game (clear isClicked, clear current score)
  const resetGame = () => {
    characters.map((character) => {
      character.isClicked = false;
    });
    score.current = 0;
    shuffle();
  }

  //set best score/new high score
  const setBestScore = () => {
    if (score.current > bestScore.current) bestScore.current = score.current;
  }

  //what happens each time card is clicked
  const playGame = (character) => {
    if (character.isClicked) {
      cardsChosen.current += 1;
      setResult("lose");
      return;
    }
    
    character.isClicked = true;
    score.current += 1;
    cardsChosen.current += 1;
    setBestScore();
    shuffle();
    
    if (score.current === characters.length) {
      setResult("win");
      return;
    }
  }

  //click event for when the card is being clicked
  const handleClick = (character) => {
    playGame(character);
  }

  //mount to DOM
  return (
    <>
      <header>
          <h1 id="heading" className="fixed-element">Memory Game</h1>
          <div id="scores">
            <section id="score">Score: {score.current}</section>
            <section id="best-score">Best Score: {bestScore.current}</section>
          </div>
      </header> 
      <main>
        <div id="card-container">
          {characters.map((character) => {
            return <Card key={character.name} name={character.name} imgUrl={"/characters/img-" + character.name + ".jpeg"} handleClick={() => handleClick(character)}/>
          })}
        </div>
      </main>
      <footer>
        <section id="cards-chosen" className="fixed-element">Cards chosen: {cardsChosen.current}</section>
        <section id="games-won">Games won: {gamesWon.current}</section>
      </footer>
    </>
  )
}