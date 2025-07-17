import { sql } from "../config/db.js";
import categories from "./categories.json" assert { type: "json" };

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
