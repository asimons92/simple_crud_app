const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = process.env.MONGO_DB_URI;
const productRoute = require('./routes/product.route.js'); 
const loginRoute = require('./routes/login.route.js')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



mongoose.connect(uri)
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000,() => {
            console.log("Server is running on port 3000.")
        })
    })
    .catch(() => {
        console.log("Connection failed!");
    })


app.get('/', (req,res) => {
    res.send('Hello from node API server');
});

// Use product routes
app.use('/api', (req, res, next) => {
  console.log('Route middleware: Request path:', req.path, 'Method:', req.method);
  next();
});
app.use('/api/products', productRoute);
app.use('/login',loginRoute)