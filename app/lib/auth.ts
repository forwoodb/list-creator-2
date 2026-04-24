import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const client = new MongoClient(process.env.MONGODB_URL!);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
});
