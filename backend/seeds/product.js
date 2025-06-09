import { sql } from "../config/db.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

const CATEGORIES = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home decoration",
  "kitchen accessories",
  "laptops",
  "mens shirts",
  "mens shoes",
  "mens watches",
  "mobile accessories",
  "motorcycle",
  "skin care",
  "smartphones",
  "sports accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens bags",
  "womens dresses",
  "womens jewellery",
  "womens shoes",
  "womens watches",
];

const NUM_PRODUCTS = 50;

// Helper to slugify text
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

async function seedDatabase() {
  try {
    await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;
    await sql`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;

    const insertedCategories = [];

    for (const category of CATEGORIES) {
      const slug = slugify(category);
      const [row] = await sql`
        INSERT INTO categories (name, slug)
        VALUES (${category}, ${slug})
        RETURNING id
      `;
      insertedCategories.push(row.id);
    }

    for (let i = 0; i < NUM_PRODUCTS; i++) {
      const name = faker.commerce.productName();
      const slug = slugify(name);
      const price = parseFloat(faker.commerce.price({ min: 10, max: 1000 }));
      const stock = faker.number.int({ min: 0, max: 100 });
      const image = faker.image.urlPicsumPhotos();
      const category_id = faker.helpers.arrayElement(insertedCategories);

      await sql`
        INSERT INTO products (name, slug, price, stock, image, category_id)
        VALUES (${name}, ${slug}, ${price}, ${stock}, ${image}, ${category_id})
      `;
    }

    console.log("✅ Seeded categories and products with slugs successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedDatabase();
