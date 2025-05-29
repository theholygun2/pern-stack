import { sql } from "../config/db.js"
import { pgPool } from "../config/pool.js";
import { handleNotFound, handleServerError } from "../utils/response.js";

const qrisExample = {
  "transaction_type": "on-us",
  "transaction_time": "2021-06-23 14:02:42",
  "transaction_status": "settlement",
  "transaction_id": "513f1f01-c9da-474c-9fc9-d5c64364b709",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "2496c78cac93a70ca08014bdaaff08eb7119ef79ef69c4833d4399cada077147febc1a231992eb8665a7e26d89b1dc323c13f721d21c7485f70bff06cca6eed3",
  "settlement_time": "2021-06-23 14:06:48",
  "payment_type": "qris",
  "order_id": "qris-01",
  "merchant_id": "G141532850",
  "issuer": "gopay",
  "gross_amount": "5539.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "acquirer": "gopay"
}

export const handleWebhook = async (req, res) => {
  const notification = req.body;

  // TODO: Verify the signature key to ensure authenticity

  const { transaction_status, order_id } = notification;
  const client = pgPool.connect();
  try {
    let newStatus = 'pending'
    switch (transaction_status) {
        case 'settlement': 
        newStatus = 'paid';
        break;
        case 'cancel':
        case 'expire':
        case 'deny':
            newStatus = 'failed';
            break;
        case 'pending':
            newStatus = 'pending';
            break;
    }
    // await client.query(`UPDATE orders SET status = $1 WHERE id = $2`, [newStatus, order_id]);
    res.status(200).json({ success: true, message: `Order ${order_id} updated to ${newStatus}` });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Webhook handling error"});
  } finally {
    client.release();
  }

  res.status(200).json({ success: false, message: "Payment status is: "});
};

export const createPayment = async (req,res) => {

}