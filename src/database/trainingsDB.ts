import trainingSchema from "../schemas/trainingSchema.ts";
import { warriorArray, currentTime } from "../globals.ts";
import type { Warrior } from "../types/Warrior.ts";
import months from "./../../data/months.json" with {type: "json"}

export async function saveTraining() {
    try
    {
        const warriorData = createWarriorsData();
        const date = getCurrentDate();
        await trainingSchema.insertOne({
            epicDate: date,
            warriors: warriorData
        });

        console.log("Training state saved in DB at " + getCurrentDate());
        console.log("");
    }
    catch(error)
    {
        console.error("Failed to save the training data, error: " + error);
    }
}

function getCurrentDate() {
    return `${months[currentTime.month]} ${currentTime.day}, ${currentTime.hour}:00 hours`
}

function createWarriorsData() {
    const warriorData: any[] = [];

    warriorArray.map((elem: Warrior) => {
        const object = {
            name: elem.name,
            weaponName: (elem.weapon?.name || "none"),
            durability: (elem.weapon?.durability || 0),
            gold: elem.gold,
            state: elem.state
        }

        warriorData.push(object);
    })

    return warriorData;
}