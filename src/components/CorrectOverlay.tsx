import useTimer from '../hooks/useTimer';
import { useState, useEffect } from 'react';
import lottie from "lottie-web";
import correctLottie from "../../public/lottie/correct.json";

interface CorrectOverlayProps{
    duration?: number,
    message?: string,
    onEnd: () => void
}

export default function CorrectOverlay(props : CorrectOverlayProps){
    const DEFAULT_DURATION = 2;
    const [timerValue, setTimerValue] = useState(DEFAULT_DURATION);

    const onEnd = () => {
        props.onEnd && props.onEnd();
    };

    const onTimerTick = (timerValue: number) => {
        setTimerValue(timerValue - 1);
    };

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector('#correct_lottie') as Element,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: correctLottie
        });
    }, []);


    // popup disappears after duration (seconds)
    useTimer({ duration: props.duration || DEFAULT_DURATION, onTimerEnd: onEnd, onTimerTick });

    return(
        <div className="absolute z-50 w-full h-screen bg-green-300 bg-opacity-30 justify-center text-center">
            <div id="correct_lottie" className="absolute z-40 inset-0 w-full h-full scale-[0.8] pointer-events-none" />
            <div className="absolute transform scale-75 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* <img src="correct.png"/> */}
                <p className="text-green-800 text-2xl font-bold tracking-wider">{props.message}</p>
            </div> 
        </div>
    );
}