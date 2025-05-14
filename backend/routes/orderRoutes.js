import express from "express"
const router = express.Router()

router.post("/checkout", requireLogin, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.session.user?.id;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const product = await db.getProduct(productId);

  if (!product || product.quantity < quantity) {
    return res.status(400).json({ message: "Invalid stock or product" });
  }

  const order = await db.createOrder(userId, productId, quantity);

  res.json({
    orderId: order.id,
    redirectUrl: `/order-summary/${order.id}`, // or Stripe URL
  });
});
