import mongoose from "mongoose";
import dotenv from "dotenv"
import trainingSetup from "./trainingRunner/trainingSetup.ts";
import cron from "node-cron";
import trainingRunner from "./trainingRunner/trainingRunner.ts";
import { trainingStatus } from "./globals.ts";
import * as trainingsDB from "./database/trainingsDB.ts"

dotenv.config();

async function start() {

    await connectDB();
    trainingSetup();
    const dbtask = cron.schedule("*/30 * * * * *", async() => {
        if(trainingStatus.canTrain)
        {
            console.log("Saving to mongoDB...");
            await trainingsDB.saveTraining();
            console.log(" ");
        }
        else
        {
            await dbtask.stop();
        }
    })

    const task = cron.schedule("*/4 * * * * *", () => {
        if(trainingStatus.canTrain)
        {
            trainingRunner();
        }
        else
        {
            task.stop();
        }
    })
}

async function connectDB() {
    if(process.env.MONGO_DB_URL)
    {
        const connected = await mongoose.connect(process.env.MONGO_DB_URL);

        if(connected) {
            console.log("MongoDB connected");
            return;
        }

        console.error("Error while connecting")
    }
    else
    {
        console.error("No mongo db connect string in .env, cannot connect to DB")
    }
}

start();