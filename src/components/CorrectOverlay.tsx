import useTimer from '../hooks/useTimer';
import { useState } from 'react';

interface CorrectOverlayProps{
    duration?: number,
    message?: string,
    onEnd: () => void
}

export default function CorrectOverlay(props : CorrectOverlayProps){
    const DEFAULT_DURATION = 3;
    const [timerValue, setTimerValue] = useState(DEFAULT_DURATION);

    const onEnd = () => {
        props.onEnd && props.onEnd();
    };

    const onTimerTick = (timerValue: number) => {
        setTimerValue(timerValue - 1);
    };

    // popup disappears after duration (seconds)
    useTimer({ duration: props.duration || DEFAULT_DURATION, onTimerEnd: onEnd, onTimerTick });

    return(
        <div className="absolute z-50 w-full h-screen bg-green-300 bg-opacity-30 justify-center text-center">
            <div className="absolute transform scale-75 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src="correct.png"/>
                <p className="text-green-800 text-2xl font-bold tracking-wider">{props.message}</p>
            </div> 
        </div>
    );
}