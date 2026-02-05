import mongoose from "mongoose";
const { Schema } = mongoose;

const warriorSchema = new Schema({
    name: String,
    weaponName: String,
    durability: Number,
    gold: Number,
    state: {type: String, enum: ["training", "finished"]}
})

const training = new Schema({
    epicDate: String,
    warriors: [warriorSchema]
})

const trainingSchema = mongoose.model("trainings", training);

export default trainingSchema;


