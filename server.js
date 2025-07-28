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
import { readFile } from "fs/promises";

const PgSession = pgSession(session)

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});


const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

if (process.env.ENABLE_CORS === "true") {
  app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  }));
};

app.use(express.json());  

app.use(
  session({
    store: new PgSession({
      pool: pgPool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "some-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.SESSION_COOKIE_SECURE === "true",
      maxAge: 1000 * 60 * 60 * 24 * 7,
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

if( process.env.ENABLE_ARCJET === "true") {
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

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  
  // server our react app
  console.log(path.join(__dirname, "frontend/dist"));
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
//Todo add Category here
export async function initDB() {
  try {

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS session (
        sid VARCHAR PRIMARY KEY,
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        google_id VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        picture TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        password_hash TEXT,
        role VARCHAR DEFAULT 'user',
        provider VARCHAR(255),
        username TEXT UNIQUE
      );
    `;

    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) UNIQUE NOT NULL,
        slug VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255),
        image VARCHAR(255),
        price NUMERIC(12, 2) NOT NULL,
        stock INTEGER NOT NULL DEFAULT '0',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        category_id INTEGER,
        CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories (id) ON UPDATE CASCADE ON DELETE SET NULL
      );
    `;

    // Create addresses table
    await sql`
      CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(100),
        state VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100),
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT now(),
        CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
      );
    `;

    // Create cart table
    await sql`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users (id)
      );
    `;

    // Create cart_items table
    await sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER REFERENCES cart(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL DEFAULT 1
      );
    `;

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        total_price NUMERIC(10, 2) NOT NULL,
        shipping_address TEXT,
        payment_method TEXT,
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'pending',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        order_code VARCHAR(255) UNIQUE,
        transaction_id VARCHAR(255),
        transaction_status VARCHAR(255),
        payment_type VARCHAR(255),
        settlement_time TIMESTAMP,
        CONSTRAINT fk_user_id_order FOREIGN KEY(user_id) REFERENCES public.users (id)
      );
    `;

    // Create order_items table
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        order_id INTEGER,
        product_id INTEGER,
        name TEXT,
        quantity INTEGER NOT NULL,
        subtotal NUMERIC(10, 2) NOT NULL,
        CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders (id) ON DELETE CASCADE,
        CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES public.products (id)
      );
    `;

    // ✅ Seed categories
    const categories = JSON.parse(
      await readFile(new URL("./seeds/categories.json", import.meta.url))
    );

    for (const cat of categories) {
      await sql`
        INSERT INTO categories (name)
        VALUES (${cat.name})
        ON CONFLICT (name) DO NOTHING
      `;
    }

    console.log("✅ All tables created and categories seeded");
  } catch (err) {
    console.error("🔥 Error initializing database:", err);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    console.log(process.env.NODE_ENV);
    console.log(process.env.CLIENT_URL);
  });
});