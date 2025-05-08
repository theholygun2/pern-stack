import { sql } from "../config/db.js"
import slugify from 'slugify'

export const getCategories = async (req,res) => {
    try{
        const categories = await sql`
        SELECT * FROM categories
        ORDER BY name`;

        console.log("fetched categories", categories);
        res.status(200).json({ success: true, data:categories})
    } catch (error)
    {
        console.error(error); // <--- kasih console.log error juga
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
export const getCategory = async (req,res) => {
    const { id } = req.params

    try {
        const product = await sql`
        SELECT * FROM categories
        WHERE id = ${id}`

        if (product.length === 0) {
            // Category not found
            return res
              .status(404)
              .json({ success: false, message: "Category not found" });
          }

        res.status(200).json({ success:true, data: product[0]})
    } catch (error) {
        console.log("Error in getCategory function", error)
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}
export const createCategory = async (req,res) => {
    const {name} = req.body

    if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Category name is required and must be a string "})
    }

    const slug = slugify(name, { lower: true, strict: true})

    try {
        const newCategory = await sql`
        INSERT INTO categories (name,slug)
        VALUES (${name},${slug})
        RETURNING *`

        res.status(201).json({ success: true, data: newCategory[0]})
    } catch (error) {
        console.log("Error in createCategory function")
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error"})
    }
}
export const updateCategory = async (req,res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        await sql`
        UPDATE categories
        SET name=${name}
        WHERE id=${id}
        RETURNING *`;

        if (updateCategory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        res.status(200).json({ success:true, data: updateCategory[0]})
    } catch (error) {
        console.log("Error in updateCategory function")
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}
export const deleteCategory = async (req,res) => {
    const { id } = req.params

    try {
        const deletedCategory = await sql`
        DELETE FROM categories
        WHERE id=${id}
        RETURNING *`;

        if (deletedCategory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({ success: true, data: deletedCategory[0]})
    } catch (error) {
        console.log("Error in deleteCategory function", error)
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}
export const getCategoryBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
      const category = await sql`
        SELECT * FROM categories WHERE slug = ${slug}
      `;
      if (!category.length) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Fetch products by category ID
      const products = await sql`
        SELECT * FROM products WHERE category_id = ${category[0].id}
      `;
      res.json({ data: category[0], products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
};
  