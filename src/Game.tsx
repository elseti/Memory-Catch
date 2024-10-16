import React from "react";
import { useState, useEffect } from "react";
import "./styles/globals.css";
import FishBox from "./components/FishBox";
import LivesBox from "./components/LivesBox";
import LevelBox from "./components/LevelBox";
import TimeBox from "./components/TimeBox";
import FishPool from "./components/FishPool";
import { getLevel, getRandomFish, HIGHEST_LEVEL } from "./components/game-logic";
import CorrectOverlay from "./components/CorrectOverlay";
import { useStore } from "./stores/store";
import WrongOverlay from "./components/WrongOverlay";
import GameOver from "./components/GameOver";
import Navbar from "./components/Navbar";
import useSound from "use-sound";
import GamePage from "./components/GamePage";
import soundFiles from "./constants/sounds";
import imageFiles from "./constants/images";

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
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);   // set to true if level info is set
  const [isStarted, setIsStarted] = useState<boolean>(false);     // set to true if start button is played
  const [showFishBox, setShowFishBox] = useState<boolean>(true);  // set to true if fish box is shown
  const [targetFish, setTargetFish] = useState<string>("");       // the name (image path) of target fish
  const [gameLevel, setGameLevel] = useState<any>();              // game level info (fetched from constants/GameLevel.ts)
  const [isCorrect, setIsCorrect] = useState<boolean>(false);     // if set to true, show correct overlay
  const [isWrong, setIsWrong] = useState<boolean>(false);         // if set to false, show wrong overlay
  const [isGameOver, setIsGameOver] = useState<boolean>(false);   // set to true if game is over (either win or lives lost)

  // using zustand for storing states for lives and level
  const lives = useStore((state) => state.lives);
  const setLives = useStore((state) => state.setLives);

  const level = useStore((state) => state.level);
  const setLevel = useStore((state) => state.setLevel);

  // use useSound to play sounds
  const [playCorrect] = useSound(soundFiles.correctSound);
  const [playWrong] = useSound(soundFiles.wrongSound);
  const [playGameOver] = useSound(soundFiles.gameoverSound);
  const [playGameCompleted] = useSound(soundFiles.levelCompletedSound);

  // run when level is successfully completed
  const handleGameSuccess = () => {
    playCorrect();
    if(level < HIGHEST_LEVEL){
      setIsCorrect(true);
      setLevel(level + 1);
      setGameLevel(getLevel(level + 1));
      setTargetFish(getRandomFish());
    }
    else{
      playGameCompleted()
      handleGameOver();
    }
  };

  // run when player is wrong or timer runs out
  const handleGameError = async() => {
    playWrong();
    setLives(lives - 1);
    if(lives === 1){
      playGameOver();
      handleGameOver();
    }
    else{
      setIsWrong(true);
      setTargetFish(getRandomFish());
    }
  };

  // run when game is over (level completed / lives lost)
  const handleGameOver = () => {
    setIsGameOver(true);
  }

  const endFishBox = () => {
    setShowFishBox(false);
  }

  const endTimer = () => {
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
    // resets game for now - to delete later
    resetGame();

    // go back to home page
    onBack();
  }

  // run when back button is pressed
  const onBack = () => {
    // go back to game page
    setIsStarted(false);

    // for now, resets the game when back button is pressed
    resetGame();
  }

  // run when start button is pressed
  const onStart = () => {
    setIsStarted(true);
  }

  // helper function to reset game
  const resetGame = () => {
    setIsGameOver(false);
    setLives(3);
    setTargetFish(getRandomFish());
    setShowFishBox(true);
    setLevel(levelInfo.level);
    setGameLevel(getLevel(levelInfo.level));
  }

  // set level, set game level details, set target fish
  useEffect(() => {
    if(levelInfo.level <= HIGHEST_LEVEL){
      setLevel(levelInfo.level);
      setGameLevel(getLevel(levelInfo.level));
      setTargetFish(getRandomFish());
      setPageLoaded(true);
    }
  }, [])

  // render after page is loaded
  if(pageLoaded && isStarted){
    return (
        <div className="bg-cover bg-no-repeat flex flex-col w-full h-screen overflow-hidden gap-6 lg:gap-12" style={{ backgroundImage: `url(${imageFiles.seaBackground})` }}>
          { isGameOver && level === HIGHEST_LEVEL && lives > 0 ? (
            <GameOver imagePath={imageFiles.boyHappy} message="YOU COMPLETED ALL LEVELS!" confettiAnimation={true} onClick={endGameOver}/>
          ) : (
            <>
              {isGameOver && <GameOver message="GAME OVER..." imagePath={imageFiles.boySad} confettiAnimation={false} onClick={endGameOver}/>}
            </>
          )}
          <Navbar text="Memory Catch" onBack={onBack}/>
          {isCorrect && <CorrectOverlay onEnd={endCorrectOverlay}/>}
          {isWrong && <WrongOverlay onEnd={endWrongOverlay}/>}
          <div className="text-center grid grid-cols-3 gap-5 lg:gap-32 text-lg md:text-4xl px-5 lg:px-20 text-white">
            {!isGameOver && <LevelBox level={level}/>}
            {(!showFishBox && !isGameOver && !isCorrect && !isWrong) ? (
              <TimeBox duration={gameLevel.timeLimit} onEnd={endTimer} /> 
              ) : ( 
              <div/>
            )}
            {!isGameOver && <LivesBox lives={lives} onEnd={endLives}/>}
          </div>
  
          {showFishBox ? (
            <FishBox imageName={targetFish} duration={gameLevel.displayTime} message="Catch this animal!" onEnd={endFishBox}/>
          ) : (
            <div>
              {!isCorrect && !isWrong && !isGameOver && <FishPool fishNumber={gameLevel.fish} correctFishName={targetFish} onCorrect={handleGameSuccess} onWrong={handleGameError}/>}
            </div>
          )}
  
        </div>
    );
  }
  
  // render instruction / manual game page
  else{
    return(
      <GamePage 
        title="Memory Catch"
        imagePath="images/mc_screenshot.png"
        backgroundPath={imageFiles.seaBackground}
        description="Players must catch a specific fish among a group of silhouetted fish. The target fish is clearly shown for a few seconds before all fish revert to silhouettes. The player must then recall and tap on the correct shadow to reel in the target fish."
        targetDomains="Episodic Memory, Working Memory, Attention and Concentration, Visuospatial"
        onStart={onStart}
      />
    );
  }

  
};

export default GameComponent;