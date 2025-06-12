import { sql } from "../config/db.js";
import axios from 'axios'

const SAMPLE_PRODUCTS = [
  {
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    quantity: 50,
    category_id: 44, // mobile accessories
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60",
    quantity: 70,
    category_id: 44, // mobile accessories
  },
  {
    name: "Smart Watch Pro",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60",
    quantity: 40,
    category_id: 56, // womens watches
  },
  {
    name: "4K Ultra HD Camera",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60",
    quantity: 30,
    category_id: 44, // mobile accessories
  },
  {
    name: "Minimalist Backpack",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
    quantity: 60,
    category_id: 52, // womens bags
  },
  {
    name: "Wireless Gaming Mouse",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60",
    quantity: 90,
    category_id: 44, // mobile accessories
  },
  {
    name: "Smart Home Speaker",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60",
    quantity: 55,
    category_id: 36, // furniture
  },
  {
    name: "LED Gaming Monitor",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
    quantity: 35,
    category_id: 39, // laptops
  },
  {
    name: "Ergonomic Office Chair",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1598300053653-e6f3c8c4a1a1?w=800&auto=format&fit=crop&q=60",
    quantity: 45,
    category_id: 36, // furniture
  },
  {
    name: "Portable SSD 1TB",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1612832020509-b2a1f0fbdce6?w=800&auto=format&fit=crop&q=60",
    quantity: 100,
    category_id: 39, // laptops
  },
  {
    name: "Noise Cancelling Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1631003125043-4b8776de73a0?w=800&auto=format&fit=crop&q=60",
    quantity: 65,
    category_id: 44, // mobile accessories
  },
  {
    name: "Dual Monitor Stand",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1622599517742-7ebf5ac59a7a?w=800&auto=format&fit=crop&q=60",
    quantity: 80,
    category_id: 39, // laptops
  },
];

