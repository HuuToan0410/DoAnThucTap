import mongoose, { Mongoose } from "mongoose";

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MISSING MONGODB_URI in .env.local");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
  _mongoose?: MongooseCache;
};

let cached: MongooseCache = globalWithMongoose._mongoose!;

if (!cached) {
  cached = globalWithMongoose._mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "tkb_edu",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
