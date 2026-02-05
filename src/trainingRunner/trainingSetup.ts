import warriors from "./../../data/warriors.json" with {type: "json"}
import weapons from "./../../data/weapons.json" with {type: "json"}
import * as globals from "./../globals.ts"
import type {Warrior} from "../types/Warrior.ts";
import type {Weapon} from "../types/Weapon.ts";

export default function trainingSetup() {

    //Inset warriors into warriorArray
    warriors.map((elem: any) => {
        elem.weapon = null;
        globals.warriorArray.push(elem);
    });

    console.log("WELCOME TO THE TRAINING GROUNDS!!!");
    console.log("----------------------------------");

    //Assign weapons to warriors in ths function
    assignWeapons();


}

function assignWeapons() {

    const remainingWeapons: Weapon[] = [];
    
    weapons.map((elem: any) => {
        remainingWeapons.push(elem);
    })

    globals.warriorArray.map((warrior: Warrior) => {

        const allowedWeapons: Weapon[] = [];

        remainingWeapons.map((elem: Weapon) => {
            if(warrior.strength >= elem.minStrength)
            {
                allowedWeapons.push(elem);
            }
        })

        if(allowedWeapons.length < 1)
        {
            console.log(`${warrior.name} has no valid weapons to wield!`);
            return;
        }

        const randomNumber = Math.floor(Math.random()*allowedWeapons.length);

        const pickedWeapon = allowedWeapons[randomNumber];

        warrior.weapon = pickedWeapon;

        for(let i=0; i<remainingWeapons.length; i++)
        {
            const currentWeapon = remainingWeapons[i];

            if(currentWeapon.name === pickedWeapon.name)
            {
                remainingWeapons.splice(i, 1);
                break;
            }
        }

        console.log(`${warrior.name} has selected the weapon "${pickedWeapon.name}"`)

    })
}
