import { useState } from 'react';

interface LevelBoxProps {
    level: number; // current level to display
}

export default function LevelBox( props: LevelBoxProps ) {

    return (
        <div className="flex flex-row -space-x-1 items-center justify-center text-center bg-slate-500 bg-opacity-85 rounded-lg p-2">
            Level: {props.level}
        </div>
    );
}
