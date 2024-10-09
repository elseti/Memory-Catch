import lottie from "lottie-web";
import { useEffect } from 'react';
import confetti2 from "../../public/confetti.json";


export interface GameOverProps{
    imagePath?: string;
    message?: string;
    confettiAnimation?: boolean;
    onClick?: () => void;
}

export default function GameOver( props:GameOverProps ){

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector('#reward_lottie') as Element,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: confetti2
        });
    }, []);


    const onClick = () => {
        props.onClick && props.onClick();
    }


    return(
        // <div className="h-screen w-screen items-center justify-center text-center mt-20">
        <div className="overflow-hidden items-center justify-center text-center absolute z-40 flex flex-col p-5 bg-rose-100 rounded-xl shadow-xl w-3/4 h-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:h-3/4"> 
            <div className="flex flex-col items-center justify-center text-center">
                {props.confettiAnimation && <div id="reward_lottie" className="absolute z-40 inset-0 w-full h-full scale-[1.4] pointer-events-none" />}
                <h2 className="text-dark-pink font-bold text-2xl">{props.message}</h2>
                <img src={props.imagePath || "boy_sad.png"} className="w-32 my-8"/>
                <h2 className="text-dark-pink">click to continue</h2>
                <button className="bg-rose-300 animate-pulse px-12 py-2 my-2 rounded-xl shadow-lg font-bold tracking-wider"
                    onClick={onClick}
                >
                    Return
                </button>
            </div>
            
        </div>
        // </div>
    
    );
}