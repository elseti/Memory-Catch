import { useState, useEffect } from 'react';
import FishSilhouette from './FishSilhouette';
import { generateRandomFishList, getRandomLeftPosition, getRandomScale, getRandomTopPosition } from './game-logic';
import { silhouetteSuffix } from '../constants/fish-images';

interface FishPoolProps {
    fishNumber: number;         // number of random fish to generate (including targetfish)
    correctFishName: string;    // name path of correct fish name
    onCorrect: () => void;      // function to run when correct
    onWrong: () => void;        // function to run when wrong
}

export default function FishPool( props: FishPoolProps ) {
    const [randomFishList, setRandomFishList] = useState<string[]>([]);
    
    useEffect(() => {
        console.log(props.correctFishName);
        setRandomFishList(generateRandomFishList(props.fishNumber, props.correctFishName));
    }, [])


    return (
        <div className="relative w-full h-screen">
            {/* Render random fishes */}
            {randomFishList.map((imageName, index) => (
                <div key={index}>
                    <FishSilhouette 
                        imageName={`${silhouetteSuffix}/${imageName}`}
                        onClick={props.onWrong}
                        leftPosition={getRandomLeftPosition(window.innerWidth)}
                        topPosition={getRandomTopPosition(window.innerHeight)}
                    />
                </div>
            ))}

            {/* Render targetted fish */}
            <FishSilhouette 
                imageName={`${silhouetteSuffix}/${props.correctFishName}`}
                onClick={props.onCorrect}
                leftPosition={getRandomLeftPosition(window.innerWidth)}
                topPosition={getRandomTopPosition(window.innerHeight)}
            />
        </div>
    );
}
