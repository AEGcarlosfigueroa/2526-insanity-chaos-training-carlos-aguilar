import { warriorArray, trainingStatus } from "../../globals.ts";
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
    }
}