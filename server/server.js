const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./static/data.json');
const cors = require('cors');

app.use(cors());

app.get("/promotions", function (req, res) {
    res.json(data.promotions);
});
app.get("/products", function (req, res) {
    res.json(data.products);
});

app.get("/promotion/:id", function (req, res) {
    const { id } = req.params;
    const promotion = data.promotions.find(item => item.id === id); 
    if (promotion) {
        res.json(promotion);
    } else {
        res.status(404).json({ message: "Promotion not found" });
    }
});
app.get("/product/:id", function (req, res) {
    const { id } = req.params;
    const promotion = data.products.find(item => item.id === id); 
    if (promotion) {
        res.json(promotion);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
app.listen(PORT, function () {
    console.log(`Server started at http://localhost:${PORT}`);
});
