const express = require("express");
const app = express();
const PORT = 3000;
const data = require("./static/data.json");
const cors = require("cors");

app.use(cors());

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
app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});
