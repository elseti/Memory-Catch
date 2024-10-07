// src/GameComponent.tsx

import React from "react";
import { useState } from "react";
import "./styles/globals.css";
import FishBox from "./components/FishBox";
import LivesBox from "./components/LivesBox";
import LevelBox from "./components/LevelBox";
import TimeBox from "./components/TimeBox";
import FishSilhouette from "./components/FishSilhouette";
import FishPool from "./components/FishPool";

interface LevelInfo {
  level: number;
  time: number;
  lives: number;
}

interface GameComponentProps {
  onSuccess: () => void;
  onError: () => void;
  levelInfo: LevelInfo;
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
const GameComponent: React.FC<GameComponentProps> = ({
  onSuccess,
  onError,
  levelInfo,
}) => {
  const [showFishBox, setShowFishBox] = useState<boolean>(true);

  const handleGameSuccess = () => {
    if (onSuccess) onSuccess();
  };

  const handleGameError = () => {
    if (onError) onError();
  };

  const { level, time, lives } = levelInfo;

  const endFishBox = () => {
    setShowFishBox(false);
  }

  const endTimer = () => {

  }

  const endLives = () => {

  }

  return (
      <div className="bg-[url('/mc_desktop_bg.png')] bg-cover bg-no-repeat flex flex-col w-full h-full gap-6">
        <p className="text-2xl lg:text-3xl text-center font-bold mt-10">Memory Catch</p>
        <div className="text-center grid grid-cols-3 gap-5 px-5 text-white">
          <LevelBox level={level}/>
          <TimeBox duration={time} onEnd={endTimer}/>
          <LivesBox lives={lives} imageName="heart.png"/>
        </div>

        {showFishBox ? (
          <FishBox imageName="anglerfish" duration={1} message="Catch this fish!" onEnd={endFishBox}/>
        ) : (
          // <div className="bg-red-400 bg-opacity-60">
          //   fish
            <FishPool fishNumber={5} correctFishName="anglerfish.png" onCorrect={onSuccess} onWrong={onError}/>
            // {/* <FishSilhouette imageName="fish_sil/anglerfish.png" onClick={handleGameSuccess}/> */}
          // </div>
        )}
        
        {/* <button
          className="px-4 py-2 text-white rounded-md bg-emerald-500"
          onClick={handleGameSuccess}
        >
          Simulate Success
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-md"
          onClick={handleGameError}
        >
          Simulate Error
        </button> */}
      </div>
      
  );
};

// whatever you do just make sure you export this
export default GameComponent;
