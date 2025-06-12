import { sql } from "../config/db.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
// Run this once or in a seed script
// then insert into DB: email, hashed


// read this bruh Serious Cryptography, 2nd Edition
async function seedAdmin() {
    const email = process.env.ADMIN_EMAIL
    const secret = process.env.SECRET_PASSWORD
    const hashed = bcrypt.hash(secret, 10);
    

    try {
        const admin =  await sql `INSERT INTO admin_users (email, password_hash) VALUES (${email}, ${hashed}) RETURN *`
        const newAdmin = admin[0]
        console.log(`The user for email ${newAdmin.email} has successfully inserted`)
    } catch (error) {
        console.error("Error in seeding admin to the db", error)
    }

}

seedAdmin()