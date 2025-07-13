import { sql } from "../config/db.js"
import { handleNotFound, handleServerError } from "../utils/response.js";
import slugify from "slugify";


export const getProducts = async (req, res) => {
  const { category_slug, name, max_price, min_price, slug, page = 1, limit = 15, deleted } = req.query;

  try {
    let baseQuery = sql`
      SELECT p.* FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE TRUE
    `;

    if (deleted === "true") 
      { baseQuery = sql`${baseQuery} AND p.deleted = TRUE`;
    } else if (deleted === "false") { baseQuery = sql`${baseQuery} AND p.deleted = FALSE`;
}

    if (category_slug) {
      baseQuery = sql`${baseQuery} AND c.slug = ${category_slug}`;
    }

    if (name) {
      baseQuery = sql`${baseQuery} AND p.name ILIKE ${'%' + name + '%'}`;
    }

    if (min_price) {
      baseQuery = sql`${baseQuery} AND p.price >= ${min_price}`;
    }

    if (max_price) {
      baseQuery = sql`${baseQuery} AND p.price <= ${max_price}`;
    }

    if (slug) {
      baseQuery = sql`${baseQuery} AND p.name ILIKE ${'%' + slug + '%'}`;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit)

    // Count total matching records
    const countQuery = sql`
      SELECT COUNT(*) FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.deleted = FALSE
    `;

    let filteredCountQuery = countQuery;

    if (category_slug) {
      filteredCountQuery = sql`${filteredCountQuery} AND c.slug = ${category_slug}`;
    }

    if (name) {
      filteredCountQuery = sql`${filteredCountQuery} AND p.name ILIKE ${'%' + name + '%'}`;
    }

    if (min_price) {
      filteredCountQuery = sql`${filteredCountQuery} AND p.price >= ${min_price}`;
    }

    if (max_price) {
      filteredCountQuery = sql`${filteredCountQuery} AND p.price <= ${max_price}`;
    }

    if (slug) {
      filteredCountQuery = sql`${filteredCountQuery} AND p.name ILIKE ${'%' + slug + '%'}`;
    }

    baseQuery = sql`${baseQuery} ORDER BY p.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [products, totalCount] = await Promise.all([
      baseQuery,
      filteredCountQuery.then((r) => parseInt(r[0].count))
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error("Error in getProducts function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { slugOrId } = req.params;

  try {
    const product = await sql`
      SELECT * FROM products
      WHERE slug = ${slugOrId} OR id::text = ${slugOrId}
      LIMIT 1;
    `;

    if (product.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const createProduct = async (req,res) => {
    const {name, price, image, category_id, stock} = req.body

    if(!name || !price || !category_id || !stock){
        return res.status(400).json({ success: false, message: "All fields are required"})
    }

    const baseSlug = slugify(name, { lower: true, strict: true})
    let slug = baseSlug
    let counter = 1

    let existing = await sql`SELECT id FROM products WHERE slug = ${slug}`
    while (existing.length > 0 ) {
      slug  = `${baseSlug}-${counter}`
      existing = await sql `SELECT id FROM products WHERE slug = ${slug}`
      counter++;
    }

    try {
        const newProduct = await sql`
        INSERT INTO products (name,price,image,category_id,slug, stock)
        VALUES (${name},${price},${image},${category_id},${slug}, ${stock})
        RETURNING *`

        res.status(201).json({ success: true, data: newProduct[0]})
    } catch (error) {
        console.log("Error in createProduct function")
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error"})
    }
}
export const updateProduct = async (req, res) => {
  const { id } = req.params
  const {name, price, image, category_id, stock } = req.body;

  const baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Avoid slug conflict with *other* products (excluding current product)
  let existing = await sql`
    SELECT id FROM products WHERE slug = ${slug} AND id != ${id}
  `;
  while (existing.length > 0) {
    slug = `${baseSlug}-${counter}`;
    existing = await sql`
      SELECT id FROM products WHERE slug = ${slug} AND id != ${id}
    `;
    counter++;
  }

  try {
    const updated = await sql`
      UPDATE products
      SET name = ${name},
          price = ${price},
          image = ${image},
          category_id = ${category_id},
          slug = ${slug},
          stock = ${stock}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updated.length === 0) {
      return handleNotFound(res, "Product");
    }

    res.status(200).json({ success: true, data: updated[0] });
  } catch (error) {
    console.log("error in updating product:ff", error)
    return handleServerError(res, error, "Failed to update product");
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`UPDATE products SET deleted = TRUE WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    console.log("Error in softDeleteProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const restoreProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`
      UPDATE products
      SET deleted = FALSE
      WHERE id = ${id}
      RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    console.log("Error in restoreProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const getProductByCategory = async (req, res) => {
  const { slug } = req.params
  const { page = 1, limit = 15 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Step 1: Get the category by slug
    const categoryResult = await sql`
      SELECT * FROM categories WHERE slug = ${slug}
    `;

    if (categoryResult.length === 0) {
      console.log(slug)
      console.log(categoryResult)
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const category = categoryResult[0];

    // Step 2: Count total products by category_id
    const totalResult = await sql`
      SELECT COUNT(*) AS count
      FROM products
      WHERE category_id = ${category.id} AND products.deleted = FALSE
    `;
    const totalCount = parseInt(totalResult[0].count);

    // Step 3: Get products by category_id
    const products = await sql`
      SELECT *
      FROM products
      WHERE category_id = ${category.id} AND products.deleted = FALSE
      LIMIT ${limit} OFFSET ${offset}
    `;

    res.status(200).json({
      success: true,
      data: products,
      category, // optional: return category info
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error in getProductByCategory:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
