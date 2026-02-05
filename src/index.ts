import mongoose from "mongoose";
import trainingSetup from "./trainingRunner/trainingSetup.ts";

function start() {
    trainingSetup();
}

start();