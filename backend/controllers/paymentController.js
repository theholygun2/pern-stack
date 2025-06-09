import { sql } from "../config/db.js"
import { pgPool } from "../config/pool.js";
import { markOrderAsPaid } from "../services/order.service.js";
import { handleNotFound, handleServerError } from "../utils/response.js";
import dotenv from 'dotenv'

const qrisExample = {
  "transaction_type": "on-us",
  "transaction_time": "2021-06-23 14:02:42",
  "transaction_status": "settlement",
  "transaction_id": "513f1f01-c9da-474c-9fc9-d5c64364b709",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "inisecret",
  "settlement_time": "2021-06-23 14:06:48",
  "payment_type": "qris",
  "order_id": "17",
  "merchant_id": "G141532850",
  "issuer": "gopay",
  "gross_amount": "5539.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "acquirer": "gopay"
}

const isValidSignature = (body) => {
  const { order_id, status_code, gross_amount, signature_key } = body;
  const expectedSignature = process.env.MIDTRANS_SERVER_KEY;
  return expectedSignature === signature_key;
};

export const handleWebhook = async (req, res) => {
  if (!isValidSignature(req.body, req.headers)) {
    return res.status(403).json({ success: false, message: "Invalid signature" });
  }
  
  const notification = req.body;

  // TODO: Verify the signature key to ensure authenticity

  const client = await pgPool.connect();

  const { transaction_status, order_id: order_code } = req.body;

  try {
    await client.query("BEGIN");
  
    if (transaction_status === "settlement") {
      await markOrderAsPaid(order_code, client); // clear and expressive
    } else if (["cancel", "expire", "deny"].includes(transaction_status)) {
      await client.query(`UPDATE orders SET status = 'failed' WHERE order_code = $1`, [order_code]);
    }
  
    await client.query("COMMIT");
    res.status(200).json({ success: true, message: `Order ${order_code} updated` });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ success: false, message: "Webhook error" });
  } finally {
    client.release();
  }
  
};