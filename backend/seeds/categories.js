import axios from "axios";
import categories from "./categories.json" assert { type: "json" };

const API_URL = "http://localhost:3000/api/categories"; // replace if needed

async function seedCategories() {
  for (const cat of categories) {
    try {
      const res = await axios.post(API_URL, cat);
      console.log(`✅ Created category: ${res.data.data.name}`);
    } catch (err) {
      console.error(`❌ Failed to create ${cat.name}:`, err.response?.data || err.message);
    }
  }
}

seedCategories();
