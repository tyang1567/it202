const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());
const products = [
    {
        id: 1,
        name: "Sony XM4",
        image: "sonyxm4.webp",
        price: 219.99,
        description: "Stylish & comfortable noise cancelling headphones"
    },
    {
        id: 2,
        name: "Apple Airpods 3 Pro",
        image: "./airpods 3 pro.webp",
        price: 220.00,
        description: "Convenient, portable noise cancelling earbuds with silicon tips"
    },
    {
        id: 3,
        name: "Apple Airpods 4",
        image: "./airpods 4.jpg",
        price: 120.00,
        description: "4th Generation airpods with noise cancellation and regular ear tips"
    },
    {
        id: 4,
        name: "Beats Fit Pro",
        image: "beats fit pro.webp",
        price: 149.99,
        description: "Earbuds with wings for security, perfect for workouts"
    }
];

// Store currently selected product
let selectedProduct = null;

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/select-product', (req, res) => {
    const { id } = req.body;
    
    if (!id || typeof id !== 'number') {
        return res.status(400).json({ error: "Must include id number of product" });
    }
    
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(400).json({ error: 'Product not found' });
    }
    
    selectedProduct = product;
    return res.json({ message: 'Product selected' });
});

app.get('/api/selected-product', (req, res) => {
    if (!selectedProduct) {
        return res.status(404).json({ error: 'No product found' });
    }
    res.json(selectedProduct);
});

app.post('/api/submit-order', (req, res) => {
    const { productId, productName, price } = req.body;
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    console.log('Order received:', {
        id: product.id,
        name: productName,
        price: price
    });
    
    return res.json({ message: 'Your item will be delivered soon.' });
});

app.listen(3000, () => console.log("Server running on port 3000"));