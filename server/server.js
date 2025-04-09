const express = require("express");
const app = express();
const PORT = 3000;
const data = require("./static/data.json");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/sklep_vue", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON
app.use(bodyParser.json());

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model("User", userSchema);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //ustawia header access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/promotions", function (req, res) {
  res.json(data.promotions);
});
app.get("/products", function (req, res) {
  let filteredProducts = data.products;

  // Filtering by name
  if (req.query.name) {
    const nameFilter = req.query.name.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(nameFilter)
    );
  }

  // Filtering by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === req.query.category
    );
  }

  // Sorting
  if (req.query._sort && req.query._order) {
    const sortKey = req.query._sort;
    const sortOrder = req.query._order.toLowerCase() === "asc" ? 1 : -1;

    filteredProducts = filteredProducts.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1 * sortOrder;
      if (a[sortKey] > b[sortKey]) return 1 * sortOrder;
      return 0;
    });
  }

  res.json(filteredProducts);
});
const categorries = ["PHONE", "TABLET", "LAPTOP", "DESKTOP"];

app.get("/categories", function (req, res) {
  res.json(categorries);
});

app.get("/promotion/:id", function (req, res) {
  const { id } = req.params;
  const promotion = data.promotions.find((item) => item.id === id);
  if (promotion) {
    res.json(promotion);
  } else {
    res.status(404).json({ message: "Promotion not found" });
  }
});
app.get("/product/:id", function (req, res) {
  const { id } = req.params;
  const promotion = data.products.find((item) => item.id === id);
  if (promotion) {
    res.json(promotion);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/createUser", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ status: "registered", user: { email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});
