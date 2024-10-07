// Game Logic for Memory Catch

import { GameLevels } from "../constants/GameLevel";

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