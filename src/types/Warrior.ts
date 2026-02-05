import type {Weapon} from "./Weapon.ts"

type Warrior = {
    name: string,
    strength: number,
    gold: number,
    weapon: Weapon | null
}

export type {Warrior}