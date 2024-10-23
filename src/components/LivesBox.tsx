import imageFiles from "../constants/images";

interface LivesBoxProps {
    lives: number;          // number of lives
    onEnd?: () => void;     // function to run when all lives disappear
}

export default function LivesBox( props: LivesBoxProps ) {
    return (
        <div className="flex flex-row gap-2 md:gap-4 items-center justify-center text-center bg-blue-900 bg-opacity-70 rounded-lg md:rounded-xl p-2">
        {
            Array.from({ length: props.lives }, (_, index) => (
            <img
                key={index}
                src={imageFiles.heart} 
                className="w-6 md:w-14"
            />
            ))
        }
        </div>

    );
}
