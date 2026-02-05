import { currentTime, trainingStatus, warriorArray } from "../../globals.ts";
import months from "./../../../data/months.json" with {type: "json"};

export default function advanceTime() {
    trainingStatus.round++;
    trainingStatus.currentWarrior++;

    if(trainingStatus.currentWarrior >= warriorArray.length) {
        trainingStatus.currentWarrior = 0;
    }

    if(!trainingStatus.timerAdvance) {
        trainingStatus.timerAdvance = true;
        return;
    }

    currentTime.hour += 2;

    if(currentTime.hour > 24) {
        currentTime.hour -= 24;
        currentTime.day++;
        if(currentTime.day > 30) {
            currentTime.day -= 30;
            currentTime.month++;
            if(currentTime.month >= months.length) {
                currentTime.month = 0;
            }
        }
    }
}