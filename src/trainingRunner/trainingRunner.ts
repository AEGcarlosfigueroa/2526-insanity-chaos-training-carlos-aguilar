import advanceTime from "./utils/advanceTime.ts";
import trainCurrentWarrior from "./utils/trainCurrentWarrior.ts";
import { currentTime, trainingStatus, warriorArray } from "../globals.ts";
import months from "./../../data/months.json" with {type: "json"};
import checkIfAnyWarriorsCanStillTrain from "./utils/checkIfAnyWarriorsCanStillTrain.ts";

export default function trainingRunner() {
    displayRoundStatus();
    displayCurrentWarrior();
    trainCurrentWarrior();
    displayTrainingResults();
    advanceTime();
    checkIfAnyWarriorsCanStillTrain();
}

function displayTrainingResults() {

    const currentWarrior = warriorArray[trainingStatus.currentWarrior];

    if(currentWarrior.weapon === null) {
        console.log(`${currentWarrior.name} has no weapon assigned and cannot train`);
        trainingStatus.timerAdvance = false;
        console.log(" ");
        return;
    }
    else if(trainingStatus.currentWarriorPastGold < trainingStatus.currentWarriorTrainingCost) {
        console.log(`${currentWarrior.name} cannot train because they do not have enough gold`);
        trainingStatus.timerAdvance = false;
        console.log(" ");
        return;
    }
    else if(trainingStatus.currentWarriorWeaponPastDurability <= 0) {
        console.log(`${currentWarrior.name} cannot train because their weapon is broken`);
        trainingStatus.timerAdvance = false;
        console.log(" ");
        return;
    }

    console.log(`Cost of training this round: ${trainingStatus.currentWarriorTrainingCost}`);
    console.log("");
    console.log("After training:")
    console.log(`Quality ${trainingStatus.currentWarriorWeaponPastQuality} → ${currentWarrior.weapon.quality}`);
    console.log(`Durability: ${currentWarrior.weapon.durability}`);
    console.log(`Gold remaining: ${currentWarrior.gold}`);
    console.log(" ");
}

function displayCurrentWarrior() {

    const currentWarrior = warriorArray[trainingStatus.currentWarrior];

    console.log(" ");
    console.log(`Warrior: ${currentWarrior.name}`);
    console.log(`Strength: ${currentWarrior.strength}`);
    console.log(`Gold: ${currentWarrior.gold}`);
    console.log(`Weapon: ${currentWarrior.weapon?.name || "none"}`);
    console.log(`Type: ${currentWarrior.weapon?.type || "none"}`);
    console.log(`Quality: ${currentWarrior.weapon?.quality || 0}`);
    console.log(`Durability: ${currentWarrior.weapon?.durability || 0}`);
    console.log(" ");
}

function displayRoundStatus() {
    console.log(`=== ROUND ${trainingStatus.round} - ${months[currentTime.month]} ${currentTime.day}, ${currentTime.hour}:00 hours ===`);
}
