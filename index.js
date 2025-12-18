const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = process.env.MONGO_DB_URI;
const productRoute = require('./routes/product.route.js'); 

//middleware
app.use(express.json());
//middleware

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
app.use('/api', productRoute);