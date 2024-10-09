// Game Logic for Memory Catch

import { GameLevels } from "../constants/GameLevel";
import { fishList } from '../constants/FishImages';

const HEIGHT_OFFSET = 350; // offset for calculating random position
const WIDTH_OFFSET = 100; // offset for calculating random position

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

export const HIGHEST_LEVEL = 10;

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
    let left = Math.floor(Math.random() * (maxWidth - WIDTH_OFFSET)); // Assuming the width of the image is 100px
    return left;
};

// generate a random top position
export function getRandomTopPosition(maxHeight: number){
    let top = Math.floor(Math.random() * (maxHeight - HEIGHT_OFFSET)); // Assuming the height of the image is 100px
    return top;
};

// generate a random number between 0.3 to 0.8 to scale the fish
export function getRandomScale() {
    let scale = (Math.random() * 0.5) + 0.3;
    return scale;
}
