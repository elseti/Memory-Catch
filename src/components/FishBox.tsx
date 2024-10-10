import useTimer from '../hooks/useTimer';
import { useState } from 'react';

interface FishBoxProps {
    duration: number; // duration (in seconds) of the fish box's appearance
    imageName: string; // file name of fish image (relative to public folder)
    message: string; // message to display in the box
    onEnd?: () => void; // function to run when fish box disappears
}

export default function FishBox( props: FishBoxProps ) {
    const [timerValue, setTimerValue] = useState(props.duration);

    const onEnd = () => {
        props.onEnd && props.onEnd();
    };

    const onTimerTick = (timerValue: number) => {
        setTimerValue(timerValue - 1);
    };

    // popup disappears after duration (seconds)
    useTimer({ duration: props.duration, onTimerEnd: onEnd, onTimerTick });

    return (
        <div className="h-screen w-screen items-center justify-center text-center mt-20 text-xl md:text-4xl">
            <div className="absolute flex flex-col m-auto left-0 right-0 p-10 bg-blue-600 bg-opacity-100 rounded-xl md:rounded-3xl shadow-xl w-3/5 h-1/3">
                <p className="text-white tracking-wide">{props.message}</p>
                <img src={`/fish_colored/${props.imageName}`} className="max-w-full m-auto md:h-52 m-auto"/>
                <p className="text-white">{timerValue}</p>
            </div>
            
        </div>
    );
}
