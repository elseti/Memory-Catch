import { useState } from 'react';

interface LivesBoxProps {
    lives: number; // number of lives
    imageName?: string; // file name of heart image (relative to public folder)
    onEnd?: () => void; // function to run when all lives disappear
}

export default function LivesBox( props: LivesBoxProps ) {
    const [lives, setLives] = useState(props.lives);

    const onEnd = () => {
        props.onEnd && props.onEnd();
    };


    return (
        <div className="flex flex-row -space-x-1 items-center justify-center text-center bg-slate-500 bg-opacity-85 rounded-lg p-1">
        {
            Array.from({ length: props.lives }, (_, index) => (
            <img
                key={index} // Use the index as the key
                src={props.imageName} 
                className="transform scale-75"
                alt={`Life ${index + 1}`} // Optional: add an alt attribute for accessibility
            />
            ))
        }
        </div>

    );
}
