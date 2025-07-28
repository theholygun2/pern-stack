import slugify from 'slugify';
import {sql} from '../config/db.js'

const categories = [
  { name: "Nature" },
  { name: "Urban" },
  { name: "Portraits" },
  { name: "Abstract" },
  { name: "Animals" },
  { name: "Travel" },
  { name: "Food" },
  { name: "Architecture" },
  { name: "Black and White" },
  { name: "Aerial" },
  { name: "Characters" },
  { name: "Movies & TV Shows" },
  { name: "Cartoons & Animation" },
  { name: "Pop Culture" },
  { name: "Fandom" },
  { name: "Nostalgia" }
];

const updated = categories.map(cat => ({
  name: cat.name,
  slug: slugify(cat.name.replace(/&/g, 'and'), { lower: true, strict: true }),
}));

for (const { name, slug } of updated) {
  await sql`UPDATE categories SET slug = ${slug} WHERE name = ${name};`;
}
