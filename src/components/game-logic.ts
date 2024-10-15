// Game Logic for Memory Catch

import { GameLevels } from "../constants/game-level";
import { fishList } from '../constants/fish-images';

const HEIGHT_OFFSET = 450; // offset for calculating random position
const WIDTH_OFFSET = 100; // offset for calculating random position
const IMAGE_HEIGHT = 0;
const IMAGE_WIDTH = 0;

export const HIGHEST_LEVEL = 10;

// get level details
export function getLevel(level:number){
    switch(level){
        case(1):
            return GameLevels.level1;
        case(2):
            return GameLevels.level2;
        case(3):
            return GameLevels.level3;
        case(4):
            return GameLevels.level4;
        case(5):
            return GameLevels.level5;
        case(6):
            return GameLevels.level6;
        case(7):
            return GameLevels.level7;
        case(8):
            return GameLevels.level8;
        case(9):
            return GameLevels.level9;
        case(10):
            return GameLevels.level10;
    }
}

// get a random fish to be targetted
export function getRandomFish(){
    let randomFish = fishList[Math.floor(Math.random() * fishList.length)];
    console.log(randomFish)
    return randomFish;
}

// generate a list of random fish (excluding the targetted fish)
export function generateRandomFishList(fishNumber: number, correctFishName: string){
    // filter out the correct fish from the fish list
    const availableFish = fishList.filter(fish => fish !== correctFishName);

    // shuffle the available fish and select a subset
    const shuffledFish = availableFish.sort(() => 0.5 - Math.random());
    return shuffledFish.slice(0, fishNumber - 1);
}


// generate a random left position
export function getRandomLeftPosition(maxWidth: number) {
    let left = Math.floor(Math.random() * (maxWidth - IMAGE_WIDTH) - WIDTH_OFFSET);
    return left;
};

// generate a random top position
export function getRandomTopPosition(maxHeight: number){
    let top = Math.floor(Math.random() * ((maxHeight - IMAGE_HEIGHT) - HEIGHT_OFFSET)); 
    return top;
};

// generate a random number to scale the fish
export function getRandomScale(minScale: number = 0.3, maxScale: number = 0.8) {
    let scale = Math.random() * (maxScale - minScale) + minScale;
    return scale;
}


// generate random values for fish silhouette animation
export function getRandomAnimationStyles() {
    let randomAnimation = Math.random();
    if(randomAnimation < 0.5){
        const randomXTranslation = Math.random() * 400 + 50; // Random X translation distance
        const randomYTranslation = Math.random() * 200 + 50; // Random Y translation distance
        const randomDuration = Math.random() * 14 + 6; // Random duration between 6-20 seconds

        return {
            animation: `move ${randomDuration}s ease-in-out infinite`,
            transform: `translate(${randomXTranslation}px, ${randomYTranslation}px)`
        };  
    }
    else{
        const randomRotation = Math.random() * 360; // Random angle between 0-360
        const randomTranslation = Math.random() * 400 + 50; // Random translation distance between 50-450px
        const randomDuration = Math.random() * 14 + 6; // Random duration between 6-20 seconds

        return {
            animation: `rotate ${randomDuration}s linear infinite`,
            transform: `rotate(${randomRotation}deg) translateX(${randomTranslation}px) rotate(-${randomRotation}deg)`
        };
    }
    
}
