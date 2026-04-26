import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const client = new MongoClient(process.env.MONGODB_URL!);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client, usePlural: true }),
  emailAndPassword: {
    enabled: true,
  },

  // plugins: [nextCookies()],
  plugins: [admin(), nextCookies()],
});
// password
