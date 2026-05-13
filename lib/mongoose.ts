import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";

const MONGODB_URL = process.env.MONGODB_URL as string;

if (!MONGODB_URL) {
    throw new Error("未找到MONGODB_URL")
}

interface MongooseCache {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async (): Promise<Mongoose> => {
    if (cached.conn) {
        logger.info("Using existing mongoose connection")
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, { dbName: "myOverflow" })
            .then((result) => {
                logger.info("Connected to MongoDB");
                return result;
            }).catch((error) => {
                logger.error("连接失败", error);
                throw error;
            })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect;