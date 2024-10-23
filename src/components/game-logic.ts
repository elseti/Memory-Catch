// Game Logic for Memory Catch

import { fishList } from '../constants/fish-images';

const IMAGE_HEIGHT = 100;
const IMAGE_WIDTH = 100;

// Define offset constants for different screen sizes
const LEFT_OFFSET_SM = 100;    // Small screen
const TOP_OFFSET_SM = 250;     // Small screen

const LEFT_OFFSET_MD = 100;     // Medium screen
const TOP_OFFSET_MD = 300;      // Medium screen

const LEFT_OFFSET_LG = 100;     // Large screen
const TOP_OFFSET_LG = 500;      // Large screen

const LEFT_OFFSET_XL = 100;    // Extra large screen
const TOP_OFFSET_XL = 400;      // Extra large screen

const LEFT_OFFSET_2XL = 100;   // 2XL screen and above
const TOP_OFFSET_2XL = 400;     // 2XL screen and above


// get a random fish to be targetted
export function getRandomFish(){
    let randomFish = fishList[Math.floor(Math.random() * fishList.length)];
    // console.log(randomFish)
    return randomFish;
}

// generate a list of random fish (excluding the targetted fish)
export function generateRandomFishList(fishNumber: number, correctFishName: string) {
    // Filter out the correct fish from the fish list
    const availableFish = fishList.filter(fish => fish !== correctFishName);

    // Check if we have enough unique fish
    if (availableFish.length < fishNumber - 1) {
        console.warn(`Not enough unique fish available. Requested: ${fishNumber - 1}, Available: ${availableFish.length}`);
        return availableFish; // or return an empty array if you prefer
    }

    // Shuffle the available fish
    const shuffledFish = availableFish.sort(() => 0.5 - Math.random());

    // Select a unique subset using array
    const uniqueFish = [];
    const usedFish = new Set();

    while (uniqueFish.length < fishNumber - 1) {
        const randomFish = shuffledFish[Math.floor(Math.random() * shuffledFish.length)];
        if (!usedFish.has(randomFish)) {
            uniqueFish.push(randomFish);
            usedFish.add(randomFish);
        }
    }

    return uniqueFish;
}




// generate a random left position
export function getRandomLeftPosition(maxWidth: number) {
    const width = window.innerWidth;
    let left: number;

    if (width <= 640) { // sm
        left = Math.floor(Math.random() * maxWidth);
        if (left > width / 2) left = Math.max(left - LEFT_OFFSET_SM, 0);
        else left = Math.min(left + LEFT_OFFSET_SM, maxWidth);
    } 
    else if (width <= 768) { // md
        left = Math.floor(Math.random() * maxWidth);
        if (left > width / 2) left = Math.max(left - LEFT_OFFSET_MD, 0);
        else left = Math.min(left + LEFT_OFFSET_MD, maxWidth);
    } 
    else if (width <= 1024) { // lg
        left = Math.floor(Math.random() * maxWidth);
        if (left > width / 2) left = Math.max(left - LEFT_OFFSET_LG, 0);
        else left = Math.min(left + LEFT_OFFSET_LG, maxWidth);
    } 
    else if (width <= 1280) { // xl
        left = Math.floor(Math.random() * maxWidth);
        if (left > width / 2) left = Math.max(left - LEFT_OFFSET_XL, 0);
        else left = Math.min(left + LEFT_OFFSET_XL, maxWidth);
    } 
    else { // 2xl and above
        left = Math.floor(Math.random() * maxWidth);
        if (left > width / 2) left = Math.max(left - LEFT_OFFSET_2XL, 0);
        else left = Math.min(left + LEFT_OFFSET_2XL, maxWidth);
    }

    left = Math.max(0, Math.min(left, maxWidth - IMAGE_WIDTH));

    console.log("Left: " + left);
    return left;
}



// generate a random top position
export function getRandomTopPosition(maxHeight: number) {
    const width = window.innerWidth; 
    const height = window.innerHeight;
    let top: number;

    if (width <= 640) { // sm
        top = Math.floor(Math.random() * (maxHeight)) - TOP_OFFSET_SM;
    } else if (width <= 768) { // md
        top = Math.floor(Math.random() * (maxHeight)) - TOP_OFFSET_MD;
    } else if (width <= 1024) { // lg
        top = Math.floor(Math.random() * (maxHeight)) - TOP_OFFSET_LG;
    } else if (width <= 1280) { // xl
        top = Math.floor(Math.random() * (maxHeight)) - TOP_OFFSET_XL;
    } else { // 2xl and above
        top = Math.floor(Math.random() * (maxHeight)) - TOP_OFFSET_2XL;
    }

    top = Math.max(IMAGE_HEIGHT, Math.min(top, height - IMAGE_HEIGHT));
    
    return top;
}


// generate a random number to scale the fish
export function getRandomScale(minScale: number = 0.3, maxScale: number = 0.8) {
    const scale = Math.random() * (maxScale - minScale) + minScale;
    return scale;
}

export function getRandomAnimationStyles(leftPosition: number, topPosition: number) {
    const randomAnimation = Math.random();
    console.log("left: " + leftPosition + "| top: " + topPosition);

    const width = window.innerWidth;
    
    // sm screen
    if (width <= 640) {
        const randomDuration = Math.random() * 14 + 6; // Random duration between 6-20 seconds
        if (randomAnimation < 0.25) {
            return { animation: `rotate_clockwise_sm ${randomDuration}s linear infinite` };
        } else if (randomAnimation < 0.5) {
            return { animation: `rotate_anticlockwise_sm ${randomDuration}s ease-in-out infinite` };
        } else if (randomAnimation < 0.75) {
            return { animation: `move_left_sm ${randomDuration}s ease-in-out infinite` };
        } else {
            return { animation: `move_right_sm ${randomDuration}s ease-in-out infinite` };
        }
    } 
    
    // md screen
    else if (width <= 768) {
        const randomDuration = Math.random() * 14 + 6; // Random duration between 6-20 seconds
        if (randomAnimation < 0.25) {
            return { animation: `rotate_clockwise_md ${randomDuration}s linear infinite` };
        } else if (randomAnimation < 0.5) {
            return { animation: `rotate_anticlockwise_md ${randomDuration}s ease-in-out infinite` };
        } else if (randomAnimation < 0.75) {
            return { animation: `move_left_md ${randomDuration}s ease-in-out infinite` };
        } else {
            return { animation: `move_right_md ${randomDuration}s ease-in-out infinite` };
        }
    } 
    
    // lg screen
    else if (width <= 1024) {
        const randomDuration = Math.random() * 14 + 6; // Random duration between 6-20 seconds
        if (randomAnimation < 0.25) {
            return { animation: `rotate_clockwise_lg ${randomDuration}s linear infinite` };
        } else if (randomAnimation < 0.5) {
            return { animation: `rotate_anticlockwise_lg ${randomDuration}s ease-in-out infinite` };
        } else if (randomAnimation < 0.75) {
            return { animation: `move_left_lg ${randomDuration}s ease-in-out infinite` };
        } else {
            return { animation: `move_right_lg ${randomDuration}s ease-in-out infinite` };
        }
    } 
    
    // xl screen
    else if (width <= 1280) {
        const randomDuration = Math.random() * 14 + 6; // Random duration between 6-20 seconds
        if (randomAnimation < 0.25) {
            return { animation: `rotate_clockwise_xl ${randomDuration}s linear infinite` };
        } else if (randomAnimation < 0.5) {
            return { animation: `rotate_anticlockwise_xl ${randomDuration}s ease-in-out infinite` };
        } else if (randomAnimation < 0.75) {
            return { animation: `move_left_xl ${randomDuration}s ease-in-out infinite` };
        } else {
            return { animation: `move_right_xl ${randomDuration}s ease-in-out infinite` };
        }
    } 
    
    // 2xl screen
    else {
        const randomDuration = Math.random() * 14 + 6; // Random duration between 6-20 seconds
        if (randomAnimation < 0.25) {
            return { animation: `rotate_clockwise_2xl ${randomDuration}s linear infinite` };
        } else if (randomAnimation < 0.5) {
            return { animation: `rotate_anticlockwise_2xl ${randomDuration}s ease-in-out infinite` };
        } else if (randomAnimation < 0.75) {
            return { animation: `move_left_2xl ${randomDuration}s ease-in-out infinite` };
        } else {
            return { animation: `move_right_2xl ${randomDuration}s ease-in-out infinite` };
        }
    }
}