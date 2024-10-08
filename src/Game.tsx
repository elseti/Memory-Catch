import React from "react";
import { useState, useEffect } from "react";
import "./styles/globals.css";
import FishBox from "./components/FishBox";
import LivesBox from "./components/LivesBox";
import LevelBox from "./components/LevelBox";
import TimeBox from "./components/TimeBox";
import FishPool from "./components/FishPool";
import { getLevel } from "./components/GameLogic";
import CorrectOverlay from "./components/CorrectOverlay";
import { useStore } from "./stores/store";
import WrongOverlay from "./components/WrongOverlay";
import GameOver from "./components/GameOver";


interface levelInfo {
  level: number;
}

interface GameComponentProps {
  onSuccess: () => void;
  onError: () => void;
  levelInfo: levelInfo;
}

/**
 * GameComponent is a React component that represents a game.
 * This a sample game component
 *
 * Props:
 * - onSuccess: A callback function that is triggered when the game is successfully completed.
 * - onError: A callback function that is triggered when an error occurs in the game.
 * - levelInfo: An object containing configuration details for the game level.
 *   - level: The current level of the game.
 *   - time: The time allocated for the game level.
 *   - lives: The number of lives available in the game level.
 */
const GameComponent: React.FC<GameComponentProps> = ({onSuccess, onError, levelInfo}) => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [showFishBox, setShowFishBox] = useState<boolean>(true);
  const [gameLevel, setGameLevel] = useState<any>();
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("Wrong!");

  // using zustand for storing states for lives and level
  const lives = useStore((state) => state.lives);
  const setLives = useStore((state) => state.setLives);

  const level = useStore((state) => state.level);
  const setLevel = useStore((state) => state.setLevel);

  const handleGameSuccess = () => {
    // if (onSuccess) onSuccess();
    // TODO- CHECK IF LEVEL IS OVER
    setIsCorrect(true);
    setLevel(level + 1);
    setGameLevel(getLevel(level + 1));
  };

  const handleGameError = () => {
    // if (onError) onError();
    setErrorMessage("Wrong answer!")
    if(lives === 1){
      handleGameOver();
      setLives(lives - 1);
    }
    else{
      setIsWrong(true);
      setLives(lives - 1);
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  }

  const endFishBox = () => {
    setShowFishBox(false);
  }

  const endTimer = () => {
    console.log("end timer")
    setErrorMessage("You ran out of time!");
    handleGameError();
    setLives(lives - 1);
  }

  const endLives = () => {
    handleGameError();
  }

  const endCorrectOverlay = () => {
    setShowFishBox(true);
    setIsCorrect(false);
  }

  const endWrongOverlay = () => {
    setIsWrong(false);
    setShowFishBox(true);
    
  }

  const endGameOver = () => {
    // TODO - go back to game page
    alert("Go back to game page")

    // resets game for now
    setIsGameOver(false);
    setLives(3);
    setLevel(levelInfo.level);
    setGameLevel(getLevel(levelInfo.level));
  }

  useEffect(() => {
    setGameLevel(getLevel(levelInfo.level));
    setPageLoaded(true);
  }, [])


  // render after page is loaded
  if(pageLoaded){
    return (
        <div className="bg-[url('/mc_desktop_bg.png')] bg-cover bg-no-repeat flex flex-col w-full h-screen overflow-hidden gap-6">
          {isGameOver && <GameOver message="GAME OVER..." onClick={endGameOver}/>}
          {isCorrect && <CorrectOverlay message="Correct!" onEnd={endCorrectOverlay}/>}
          {isWrong && <WrongOverlay message={errorMessage} onEnd={endWrongOverlay}/>}
          <p className="text-2xl lg:text-3xl text-center font-bold mt-10">Memory Catch</p>
          <div className="text-center grid grid-cols-3 gap-5 px-5 text-white">
            {!showFishBox && !isCorrect && !isWrong && !isGameOver && <LevelBox level={level}/>}
            {!showFishBox && !isCorrect && !isWrong && !isGameOver && <TimeBox duration={gameLevel.timeLimit} onEnd={endTimer}/>}
            {!showFishBox && !isCorrect && !isWrong && !isGameOver && <LivesBox lives={lives} imageName="heart.png" onEnd={endLives}/>}
            {/* TODO - add lives to game level constant? */}
          </div>
  
          {showFishBox ? (
            <FishBox imageName="anglerfish.png" duration={gameLevel.displayTime} message="Catch this fish!" onEnd={endFishBox}/>
          ) : (
            <div>
              {!isCorrect && !isWrong && !isGameOver && <FishPool fishNumber={gameLevel.fish} correctFishName="anglerfish.png" onCorrect={handleGameSuccess} onWrong={handleGameError}/>}
            </div>
          )}
  
        </div>
    );
  }

  
};

export default GameComponent;