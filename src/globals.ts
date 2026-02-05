import type {Warrior} from "./types/Warrior.ts";

export const warriorArray: Warrior[] = [];

export const currentTime = {
    month: 0,
    day: 30,
    hour: 13
}

export const trainingStatus = {
    round: 1,
    currentWarrior: 0,
    currentWarriorWeaponPastQuality: 0,
    currentWarriorTrainingCost: 0,
    timerAdvance: true,
    canTrain: true
}


