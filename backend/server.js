import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import session  from "express-session"
import pgSession from 'connect-pg-simple'
import { pgPool } from "./config/pool.js";

const PgSession = pgSession(session)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(cors({
  origin: "http://localhost:5173", // ✅ MUST be explicit
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    store: new PgSession({
      pool: pgPool,
      tableName: "session", // optional, defaults to "session"
    }),
    secret: process.env.SESSION_SECRET || "some-secret-key",
    resave: false,
    saveUninitialized: false, // ← don't create empty sessions
    cookie: {
      secure: false, // set to true if using HTTPS in production
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests

// apply arcjet rate-limit to all routes

if( process.env.NODE_ENV === "production") {
  app.use(async (req, res, next) => {
    try {
      const decision = await aj.protect(req, {
        requested: 1, // specifies that each request consumes 1 token
      });
  
      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          res.status(429).json({ error: "Too Many Requests" });
        } else if (decision.reason.isBot()) {
          res.status(403).json({ error: "Bot access denied" });
        } else {
          res.status(403).json({ error: "Forbidden" });
        }
        return;
      }
  
      // check for spoofed bots
      if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
        res.status(403).json({ error: "Spoofed bot detected" });
        return;
      }
  
      next();
    } catch (error) {
      console.log("Arcjet error", error);
      next(error);
    }
  });
}

app.use("/auth", authRoutes)
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/users", userRoutes)
app.use("/auth/admin", adminRoutes)

if (process.env.NODE_ENV === "production") {
  // server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
//Todo add Category here
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        stock INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});