require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

// CREATE
app.post("/api/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// READ
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});