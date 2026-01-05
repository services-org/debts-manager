import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/debts-manager";
if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

// Use global to persist connection across hot reloads in development
type GlobalWithMongoose = typeof globalThis & {
    mongoose: {
        promise: Promise<typeof mongoose> | null;
        conn: typeof mongoose | null;
    };
};

const globalWithMongoose = globalThis as GlobalWithMongoose;
if (!globalWithMongoose.mongoose) globalWithMongoose.mongoose = { conn: null, promise: null };

export const DBConnection = async () => {
    if (globalWithMongoose.mongoose.promise) return globalWithMongoose.mongoose.promise;
    if (globalWithMongoose.mongoose.conn) return globalWithMongoose.mongoose.conn;

    try {
        globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
        globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;

        console.log("✔️ DB Connection");
    } catch (error: any) {
        globalWithMongoose.mongoose.promise = null;
        console.log("❌ Failed to connect to DB", error.message);
    }
};
