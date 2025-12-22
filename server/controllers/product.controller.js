const Product = require('../models/product.model')


// get all products
const getProducts = async (req,res) => {
    try{
        console.log('getProducts controller called');
        const products = await Product.find({}); 
        res.status(200).json(products);
     } catch (error) {
         res.status(500).json({message: error.message});
     }
}

// get product by id
const getProductById = async (req,res) => {
    try{
        const { id } = req.params;
        console.log('getProductById controller called with id:', id);
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// update product by id
const updateProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,
            req.body
        );
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({message: 'Updated product.'})



    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// delete product by id
const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// add new product

const addProduct = async (req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addProduct
}