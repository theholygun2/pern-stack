import { sql } from "../config/db.js"

export const getUserByID = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const [user] = await sql `
            SELECT *
            FROM users
            WHERE id = ${id}`
            if (! user) return res.status(404).json({ message: "User not found", data: {}})
            res.json(user)
    } catch (error) {
        res.status(500).json({ message: {error}})
    }
}