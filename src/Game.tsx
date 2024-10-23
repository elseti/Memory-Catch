import React from "react";
import { useState, useEffect } from "react";
import "./styles/globals.css";
import FishBox from "./components/FishBox";
import LivesBox from "./components/LivesBox";
import LevelBox from "./components/LevelBox";
import TimeBox from "./components/TimeBox";
import FishPool from "./components/FishPool";
import { getRandomFish } from "./components/game-logic";
import CorrectOverlay from "./components/CorrectOverlay";
import { useStore } from "./stores/store";
import WrongOverlay from "./components/WrongOverlay";
import Navbar from "./components/Navbar";
import useSound from "use-sound";
import GamePage from "./components/GamePage";
import soundFiles from "./constants/sounds";
import imageFiles from "./constants/images";

interface levelInfo {
  level: number;          // level to start from
  fish: number;           // number of fish to find on this level
  displayTime: number;    // time for the targetted fish box to appear
  timeLimit: number;      // time limit to find the fish
  lives: number;          // number of lives start from on this level
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
 *   - fish: number of fish swimming on this level
 *   - displayTime: display time of the targetted fish (for fish box)
 */
const GameComponent: React.FC<GameComponentProps> = ({onSuccess, onError, levelInfo}) => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);   // set to true if level info is set
  const [isStarted, setIsStarted] = useState<boolean>(false);     // set to true if start button is played
  const [showFishBox, setShowFishBox] = useState<boolean>(true);  // set to true if fish box is shown
  const [targetFish, setTargetFish] = useState<string>("");       // the name (image path) of target fish
  const [gameLevelInfo, setGameLevelInfo] = useState<any>();      // game level info (fetched from constants/GameLevel.ts)
  const [isCorrect, setIsCorrect] = useState<boolean>(false);     // if set to true, show correct overlay
  const [isWrong, setIsWrong] = useState<boolean>(false);         // if set to false, show wrong overlay

  // using zustand for storing states for lives and level
  const lives = useStore((state) => state.lives);
  const setLives = useStore((state) => state.setLives);

  const level = useStore((state) => state.level);
  const setLevel = useStore((state) => state.setLevel);

  // use useSound to play sounds
  const [playCorrect] = useSound(soundFiles.correctSound);
  const [playWrong] = useSound(soundFiles.wrongSound);

  // run when level is successfully completed
  const handleGameSuccess = () => {
    playCorrect();
    setIsCorrect(true);
    onSuccess(); // run onSuccess from props
  };

  // run when player is wrong or timer runs out
  const handleGameError = async() => {
    playWrong();
    setIsWrong(true);
    onError(); // run onError from props
    // setLives(lives - 1);
  };

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

  // run when back button is pressed
  const onBack = () => {
    // go back to game page
    setIsStarted(false);
  }

  // run when start button is pressed
  const onStart = () => {
    setIsStarted(true);
  }

  // set level, set game level details, set target fish
  useEffect(() => {
    setGameLevelInfo(levelInfo)
    setTargetFish(getRandomFish());
    setPageLoaded(true);
    setLevel(levelInfo.level);
    setLives(levelInfo.lives);
  }, [])

  // render after page is loaded
  if(pageLoaded && isStarted){
    return (
      <div className="bg-cover bg-no-repeat flex flex-col w-full h-screen overflow-hidden gap-6 lg:gap-12" style={{ backgroundImage: `url(${imageFiles.seaBackground})` }}>
        <Navbar text="Memory Catch" onBack={onBack}/>
        {isCorrect && <CorrectOverlay onEnd={endCorrectOverlay}/>}
        {isWrong && <WrongOverlay onEnd={endWrongOverlay}/>}
        <div className="text-center grid grid-cols-3 gap-5 lg:gap-32 text-lg md:text-4xl px-5 lg:px-20 text-white">
          <LevelBox level={level}/>
          {(!showFishBox && !isCorrect && !isWrong) ? (
            <TimeBox duration={gameLevelInfo.timeLimit} onEnd={endTimer} /> 
            ) : ( 
            <div/>
          )}
          <LivesBox lives={lives} onEnd={endLives}/>
        </div>

        {showFishBox ? (
          <FishBox imageName={targetFish} duration={gameLevelInfo.displayTime} message="Catch this animal!" onEnd={endFishBox}/>
        ) : (
          <div>
            {!isCorrect && !isWrong && <FishPool fishNumber={gameLevelInfo.fish} correctFishName={targetFish} onCorrect={handleGameSuccess} onWrong={handleGameError}/>}
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