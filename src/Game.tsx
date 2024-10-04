// src/GameComponent.tsx

import React from "react";
import "./styles/globals.css";

interface LevelInfo {
  level: number;
  time: number;
  lives: number;
}

interface GameComponentProps {
  onSuccess?: () => void;
  onError?: () => void;
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
  const handleGameSuccess = () => {
    if (onSuccess) onSuccess();
  };

  const handleGameError = () => {
    if (onError) onError();
  };

  const { level, time, lives } = levelInfo;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <h1>Game Level: {level}</h1>
      <p>Time: {time}</p>
      <p>Lives: {lives}</p>
      <button
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
      </button>
    </div>
  );
};

// whatever you do just make sure you export this
export default GameComponent;
