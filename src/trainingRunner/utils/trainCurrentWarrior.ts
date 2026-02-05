import { trainingStatus, warriorArray } from "../../globals.ts";

export default function trainCurrentWarrior() {
    const currentWarrior = warriorArray[trainingStatus.currentWarrior];

    if(currentWarrior.weapon === null) {
        trainingStatus.timerAdvance = false;
        currentWarrior.state = "finished"
        return;
    }

    if(currentWarrior.weapon.durability <= 0) {
        trainingStatus.timerAdvance = false;
        currentWarrior.state = "finished"
        return;
    }

    const trainingCost = Math.ceil(currentWarrior.weapon.cost / 10);

    trainingStatus.currentWarriorTrainingCost = trainingCost;

    if(trainingCost > currentWarrior.gold) {
        trainingStatus.timerAdvance = false;
        currentWarrior.state = "finished"
        return;
    }

    currentWarrior.gold -= trainingCost;

    const result = throwDice();

    let valueToMultiplyQuality = 0.10;

    let increaseDurability = false;

    if(result === -1) {
        valueToMultiplyQuality = 0.20;
    }
    else if(result === 3) {
        if(Math.floor(Math.random()*2) < 1) {
            increaseDurability = true;
        }
    }

    trainingStatus.currentWarriorWeaponPastQuality = currentWarrior.weapon.quality;

    currentWarrior.weapon.quality += result;

    if(!increaseDurability) {
        let amountToReduceDurability = Math.floor(currentWarrior.weapon.durability * valueToMultiplyQuality);
        if(amountToReduceDurability < 1) {
            amountToReduceDurability = 1;
        }
        currentWarrior.weapon.durability -= amountToReduceDurability
    }
    else {
        currentWarrior.weapon.durability++;
    }

    if(currentWarrior.weapon.quality < 0) {
        currentWarrior.weapon.durability -= currentWarrior.weapon.quality;
    }

}

function throwDice() {
    //Equivalent to throwing a 1D5-2 dice
    const result = Math.floor(Math.random()* 5) + 1 - 2;
    return result;
}