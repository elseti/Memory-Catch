import { useState } from 'react';
import useTimer from '../hooks/useTimer';
import imageFiles from '../constants/images';


interface TimeBoxProps {
    duration: number;       // duration of timer (seoncds)
    onEnd: () => void;      // function to run when timer runs out
}

export default function TimeBox( props: TimeBoxProps ) {
    const [timerValue, setTimerValue] = useState(props.duration);

    const onEnd = () => {
        props.onEnd && props.onEnd();
    };

    const onTimerTick = (timerValue: number) => {
        setTimerValue(timerValue - 1); 
    };

    useTimer({ duration: props.duration, onTimerEnd: onEnd, onTimerTick });

    return (
        <div className="grid grid-cols-2 justify-center items-center bg-blue-900 bg-opacity-70 rounded-lg gap-1 md:rounded-xl p-2 md:p-5">
            <img src={imageFiles.timer} className="w-6 md:w-10 mx-3" />
            <div>{timerValue}</div>
        </div>
    );
}
