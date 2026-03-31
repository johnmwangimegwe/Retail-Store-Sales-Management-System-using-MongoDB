import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use strict: false to accept your existing MongoDB documents as-is
const bookSchema = new mongoose.Schema({}, { strict: false });
const customerSchema = new mongoose.Schema({}, { strict: false });
const orderSchema = new mongoose.Schema({}, { strict: false });

// "books_clean" is your collection with 15,147 books
const Book = mongoose.model("Book", bookSchema, "books_clean");
const Customer = mongoose.model("Customer", customerSchema, "customers");
const Order = mongoose.model("Order", orderSchema, "orders");

// Books
app.get("/api/books", async (_, res) => {
  try {
    const books = await Book.find().limit(100);
    console.log("Books found:", books.length);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/books", async (req, res) => res.json(await Book.create(req.body)));
app.put("/api/books/:id", async (req, res) => res.json(await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/api/books/:id", async (req, res) => { await Book.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

// Customers
app.get("/api/customers", async (_, res) => res.json(await Customer.find()));
app.post("/api/customers", async (req, res) => res.json(await Customer.create(req.body)));

// Orders
app.get("/api/orders", async (_, res) => res.json(await Order.find()));
app.post("/api/orders", async (req, res) => res.json(await Order.create(req.body)));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => console.log(`🚀 API running on port ${process.env.PORT}`));
  })
  .catch(err => { console.error("MongoDB connection error:", err); process.exit(1); });