import { useState } from 'react';

interface FishPoolProps {
    duration: number; // duration (in seconds) of the fish box's appearance
    imageName: string; // file name of fish image (relative to public folder)
    message: string; // message to display in the box
    onEnd?: () => void; // function to run when fish box disappears
}

export default function FishPool( props: FishPoolProps ) {
    const [timerValue, setTimerValue] = useState(props.duration);

    const onEnd = () => {
        props.onEnd && props.onEnd();
    };


    return (
        <div className="h-screen w-screen items-center justify-center text-center mt-20">
            <div className="absolute flex flex-col m-auto left-0 right-0 p-10 bg-slate-500 bg-opacity-85 rounded-xl shadow-xl w-1/2 h-1/3">
                <div>asdfjkasdkjf</div>
            </div>
            
        </div>
    );
}
