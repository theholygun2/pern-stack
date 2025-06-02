export const deductProductStock = async (id, client) => {

    const { rows: items } = await client.query(`
        SELECT product_id, quantity
        FROM order_items
        WHERE order_id  = $1`, [id]
    )

    for (const item of items) {
        await client.query(`
            UPDATE products
            SET quantity = quantity - $1
            WHERE id = $2`,
        [item.quantity, item.product_id])
    }
}