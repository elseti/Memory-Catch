import lottie from "lottie-web";
import { useEffect } from 'react';
import imageFiles from "../constants/images";

export interface GameOverProps{
    imagePath?: string;             // path of image for gameover
    message?: string;               // text
    confettiAnimation?: boolean;    // true if you want to play confetti animation 
    onClick?: () => void;           // function run when "return" button is clicked
}

export default function GameOver( props:GameOverProps ){

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector('#reward_lottie') as Element,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: imageFiles.confettiLottie
        });
    }, []);


    const onClick = () => {
        props.onClick && props.onClick();
    }


    return(
        <div className="py-64 overflow-hidden items-center justify-center text-center absolute z-40 flex flex-col p-5 bg-gradient-to-b from-blue-300 to-blue-600 rounded-xl shadow-xl w-3/4 h-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 sm:h-3/5"> 
            <div className="flex flex-col items-center justify-center text-center text-blue-950 text-xl md:text-4xl">
                {props.confettiAnimation && <div id="reward_lottie" className="absolute z-40 inset-0 w-full h-full scale-[1.4] pointer-events-none" />}
                <h2 className="text-dark-pink font-bold">{props.message}</h2>
                <img src={props.imagePath || imageFiles.boySad} className="w-32 my-8 md:w-44"/>
                <h2 className="text-dark-pink text-blue-100 text-lg md:text-2xl">click to continue</h2>
                <button className="bg-blue-200 animate-pulse px-12 py-2 md:py-4 my-2 rounded-2xl shadow-lg font-bold tracking-wider text-blue-950"
                    onClick={onClick}
                >
                    Return
                </button>
            </div>
        </div>
    );
}