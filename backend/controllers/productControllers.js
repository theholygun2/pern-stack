import { sql } from "../config/db.js"

export const getProducts = async (req,res) => {
    try{
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC`;

        console.log("fetched products", products);
        res.status(200).json({ success: true, data:products})
    } catch (error)
    {
        console.error(error); // <--- kasih console.log error juga
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
export const getProduct = async (req,res) => {
    const { id } = req.params

    try {
        const product = await sql`
        SELECT * FROM products
        WHERE id = ${id}`

        if (product.length === 0) {
            // Product not found
            return res
              .status(404)
              .json({ success: false, message: "Product not found" });
          }

        res.status(200).json({ success:true, data: product[0]})
    } catch (error) {
        console.log("Error in getProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}
export const createProduct = async (req,res) => {
    const {name,price,image,category_id} = req.body

    if(!name || !price || !image || !category_id){
        return res.status(400).json({ success: false, message: "All fields are required"})
    }

    try {
        const newProduct = await sql`
        INSERT INTO products (name,price,image,category_id)
        VALUES (${name},${price},${image},${category_id})
        RETURNING *`

        res.status(201).json({ success: true, data: newProduct[0]})
    } catch (error) {
        console.log("Error in createProduct function")
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error"})
    }
}
export const updateProduct = async (req,res) => {
    const { id } = req.params
    const {name, price, image, category_id } = req.body

    try {
        await sql`
        UPDATE products
        SET name=${name}, price=${price}, image=${image}, category_id=${category_id}
        WHERE id=${id}
        RETURNING *`;

        if (updateProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({ success:true, data: updateProduct[0]})
    } catch (error) {
        console.log("Error in updateProduct function")
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}
export const deleteProduct = async (req,res) => {
    const { id } = req.params

    try {
        const deletedProduct = await sql`
        DELETE FROM products
        WHERE id=${id}
        RETURNING *`;

        if (deletedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({ success: true, data: deletedProduct[0]})
    } catch (error) {
        console.log("Error in deleteProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}

export const getProductsByCategory = async (req, res) => {
    const { category_id } = req.params;
    try {
        const products = await sql`
        SELECT * FROM products
        WHERE category_id = ${category_id}
        ORDER BY created_at DESC`;

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in getProductsByCategory", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};