import { useState } from 'react';
import useTimer from '../hooks/useTimer';

interface TimeBoxProps {
    duration: number; // duration of timer (seoncds)
    onEnd?: () => void; // function to run when timer runs out
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
        <div className="flex flex-row -space-x-1 items-center justify-center text-center bg-slate-500 bg-opacity-85 rounded-lg p-2 gap-5">
            <img src="timer.png" className="w-5" />
            <div>{timerValue}</div>
        </div>
    );
}
