import React from "react";
import { useState, useEffect } from "react";
import FishBox from "./FishBox";
import FishPool from "./FishPool";
import CorrectOverlay from "./CorrectOverlay";

interface MainGameProps{
    levelInfo: any,
    onSuccess: () => void,
    onError: () => void
}

export default function MainGame(props : MainGameProps) {
    const [showFishBox, setShowFishBox] = useState<boolean>(true);
    // const [isCorrect, setIsCorrect] = useState<boolean>(false);
  
    const handleGameSuccess = () => {
    //   setIsCorrect(true);
      props.onSuccess();
    };
  
    const handleGameError = () => {
      props.onError();
    };
  
    const endFishBox = () => {
      setShowFishBox(false);
    };
  
    return (
      <>
        {/* {isCorrect && <CorrectOverlay />} */}
        {showFishBox ? (
          <FishBox
            imageName="anglerfish"
            duration={props.levelInfo.displayTime}
            message="Catch this fish!"
            onEnd={endFishBox}
          />
        ) : (
          <FishPool
            fishNumber={props.levelInfo.fish}
            correctFishName="anglerfish.png"
            onCorrect={handleGameSuccess}
            onWrong={handleGameError}
          />
        )}
      </>
    );
  };
  