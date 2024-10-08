import { useState, useEffect } from 'react';

export interface UseCountdownTimerProps {
  duration: number;
  onTimerTick: (timerValue:number) => void;
  onTimerEnd: () => void;
}

const useTimer = (props:UseCountdownTimerProps) => {
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [timerValue, setTimerValue] = useState(props.duration);

  useEffect(() => {
    if (timerValue > 0) {
      const interval = setInterval(() => {
        setTimerValue((prevTimerValue) => prevTimerValue - 1);
        props.onTimerTick(timerValue);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timerValue === 0 && !isTimerDone) {
      setIsTimerDone(true);
      props.onTimerEnd();
    }
  }, [timerValue]);

  return { isTimerDone, timerValue };
};

export default useTimer;
