import { sql } from "../config/db.js"
import { handleNotFound, handleServerError } from "../utils/response.js";

// createOrder, addOrderItem, getOrder, getOrderItem, 

export const getOrder = async (req,res) => {

}

export const addOrder = async (req, res) => {
    const { user } = req.session.user
    const { cart } = req.session.cart
    const { }  = req.body

}