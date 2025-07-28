import {sql} from './config/db.js';

const postDataExample = {
  "transaction_time": "2020-01-09 18:27:19",
  "transaction_status": "capture",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "payment_type": "credit_card",
  "order_id": "Postman-1578568851",
  "merchant_id": "G141532850",
  "masked_card": "48111111-1114",
  "gross_amount": "10000.00",
  "fraud_status": "accept",
  "eci": "05",
  "currency": "IDR",
  "channel_response_message": "Approved",
  "channel_response_code": "00",
  "card_type": "credit",
  "bank": "bni",
  "approval_code": "1578569243927"
}

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

const resetDB = async () => {
  try {
    console.log("⚠️ Dropping all tables...");
    await sql`DROP TABLE IF EXISTS order_items, orders, cart_items, cart, session, addresses, products, categories, users CASCADE;`;
    console.log("✅ Tables dropped.");
  } catch (error) {
    console.error(error);
  }
}

resetDB();