import { sql } from "../config/db.js";
import axios from "axios";
import categories from "./categories.json" assert { type: "json" };

const API_URL = "http://localhost:3000/api/categories"; // replace if needed

async function seedCategories() {

  try {
    await sql`TRUNCATE TABLE categories RESTART IDENTITY`

    for (const category of categories) {
      await sql`
      INSERT INTO categories (name)
      VALUES (${category.name});`
    }
  } catch(error) {
    console.log("error add categories", error)
  }
}

seedCategories();
