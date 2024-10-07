import { useState } from 'react';

interface TimeBoxProps {
    duration: number; // duration of timer (seoncds)
    // imageName?: string; // file name of heart image (relative to public folder)
    onEnd?: () => void; // function to run when timer runs out
}

export default function TimeBox( props: TimeBoxProps ) {
    const [duration, setDuration] = useState(props.duration);

    const onEnd = () => {
        props.onEnd && props.onEnd();
    };


    return (
        <div className="flex flex-row -space-x-1 items-center justify-center text-center bg-slate-500 bg-opacity-85 rounded-lg p-2">
            Time: {duration}
        </div>
    );
}
