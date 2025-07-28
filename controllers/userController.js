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

export const authMe = async (req, res) => { // this is for the user loges in wihtout the google oauth 2 brother
    if (!req.session || !req.session.user) {
      return res.status(200).json(null); // No error, just null user
    }
    console.log("session:", req.session.user);
  
    const [user] = await sql`
      SELECT id, name, email, picture FROM users WHERE id = ${req.session.user.id}
    `;
    
    return res.json(user);
  };