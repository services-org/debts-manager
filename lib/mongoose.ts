import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/debts-manager";
if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

let cached = false;

export const DBConnection = async () => {
    if (cached) return;

    try {
        mongoose.connect(MONGODB_URI, { bufferCommands: false });

        cached = true;
        console.log("✔️ DB Connection");
    } catch (error: any) {
        console.log("❌ Failed to connect to DB", error.message);
    }
};
