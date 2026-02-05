type Weapon = {
    name: string,
    type: { type: string, enum: ["Sword", "Axe", "Dagger", "Hammer", "Bow", "Spear", "Greatsword", "Mace", "Crossbow"] },
    quality: number,
    minStrength: number,
    cost: number,
    durability: number
}

export type { Weapon }