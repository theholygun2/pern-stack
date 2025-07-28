// backend/config/db.js

import dotenv from "dotenv";
dotenv.config(); // MUST come first

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in your .env file");
}

export const sql = neon(process.env.DATABASE_URL);