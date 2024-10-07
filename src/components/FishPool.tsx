import { useState, useEffect } from 'react';
import { fishList } from '../constants/FishImages';
import FishSilhouette from './FishSilhouette';

interface FishPoolProps {
    fishNumber: number;
    correctFishName: string; // name of correct fish name
    onCorrect: () => void; // function to run when fish box disappears
    onWrong: () => void;
}

export default function FishPool( props: FishPoolProps ) {
    const HEIGHT_OFFSET = 350;
    const WIDTH_OFFSET = 100;

    const [randomFishList, setRandomFishList] = useState<string[]>([]);

    // generate a list of random fish (excluding the targetted fish)
    const generateRandomFishList = () => {
        let randomList: string[] = [];
        
        while (randomList.length < props.fishNumber - 1) {
            let randomFish = fishList[Math.floor(Math.random() * fishList.length)];
            
            if (!(randomList.includes(randomFish) && randomList.includes(props.correctFishName))) {
                randomList.push(randomFish);
            }
        }
        return randomList; 
    };
    
    // generate a random left position
    const getRandomLeftPosition = (maxWidth: number) => {
        let left = Math.floor(Math.random() * (maxWidth - WIDTH_OFFSET)); // Assuming the width of the image is 100px
        return left;
    };

    // generate a random top position
    const getRandomTopPosition = (maxHeight: number) => {
        let top = Math.floor(Math.random() * (maxHeight - HEIGHT_OFFSET)); // Assuming the height of the image is 100px
        return top;
    };

    // generate a random number between 0.3 to 0.8 to scale the fish
    const getRandomScale = () => {
        let scale = (Math.random() * 0.5) + 0.3;
        return scale;
    }

    useEffect(() => {
        setRandomFishList(generateRandomFishList);
    }, [])
    
    return (
        <div className="relative w-full h-screen mt-20">
            {/* Render random fish */}
            {randomFishList.map((imageName, index) => (
                <div key={index}>
                    <FishSilhouette 
                        imageName={`fish_sil/${imageName}`}
                        onClick={props.onWrong}
                        leftPosition={getRandomLeftPosition(window.innerWidth)}
                        topPosition={getRandomTopPosition(window.innerHeight)}
                        scale={getRandomScale()}
                    />
                </div>
            ))}

            {/* Render targetted fish */}
            <FishSilhouette 
                imageName={`fish_sil/${props.correctFishName}`}
                onClick={props.onCorrect}
                leftPosition={getRandomLeftPosition(window.innerWidth)}
                topPosition={getRandomTopPosition(window.innerHeight)}
                scale={getRandomScale()}
            />
        </div>
    );
}
