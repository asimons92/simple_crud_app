const mongoose = require('mongoose');
const User = require('./user.model');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        }


    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;