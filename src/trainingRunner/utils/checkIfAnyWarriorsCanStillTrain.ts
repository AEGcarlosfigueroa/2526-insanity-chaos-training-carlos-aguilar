import { warriorArray, trainingStatus, tasks } from "../../globals.ts";
import type { Warrior } from "./../../types/Warrior.ts";

export default function checkIfAnyWarriorsCanStillTrain() {

    let canStillTrain = false;

    warriorArray.map((elem: Warrior) => {
        if(elem.state === "training")
        {
            canStillTrain = true;
        }
    });

    if(!canStillTrain) {
        trainingStatus.canTrain = false;
        console.log("All warriors have finished training, stopping all crons...");
        stopAllTasks();
    }
}

function stopAllTasks() {
    for(let i=0; i<tasks.length; i++)
    {
        tasks[i].stop();
    }
}