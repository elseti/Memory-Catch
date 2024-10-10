interface LevelBoxProps {
    level: number; // current level to display
}

export default function LevelBox( props: LevelBoxProps ) {
    return (
        <div className="flex flex-row -space-x-1 items-center justify-center text-center bg-blue-900 bg-opacity-70 rounded-lg md:rounded-xl p-2 md:p-5">
            Level {props.level}
        </div>
    );
}
