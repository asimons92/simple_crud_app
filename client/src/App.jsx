import axios from 'axios';
import { useState, useEffect } from 'react';
import { productService } from '../services/productsService';


const apiGet = () => {
  axios.get('http://localhost:3000').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}



// each product
function Product({ product, handleDelete } ) {
  return (
    <div className="product">
      <ul className="product-list">
        <li className="product-name">{product.name}</li>
        <li className="product-price">Price: ${product.price}</li>
        <li className="product-quantity">Quantity: {product.quantity}</li>
      </ul>
      
      <button 
        type="button" 
        className='delete-button'
        onClick={() => handleDelete(product._id)}
      >
        Delete
      </button>
      
      

    </div>
  );
}

// the container for displaying products
function ProductDisplay({ products, handleDelete }) {
  return (
    <div className = "product-display">
      {products.map((product) =>
        <Product 
          key={product._id} 
          product={product} 
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}


//main app
export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const getProducts = async () => {
    const res = await productService.getAll();
    setProducts(res.data);
  }
  
  // Call getProducts when component first loads
  useEffect(() =>
    { getProducts(); },
    []
  )
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a product object from the form state
    const product = {
      name: name,
      price: Number(price),      // Convert string to number
      quantity: Number(quantity) // Convert string to number
    };
    
    try {
      // Send the product to the backend API
      const res = await productService.create(product);
      console.log('Product created:', res.data);
      
      // Reset the form
      setName('');
      setPrice('');
      setQuantity('');
      
      // Optionally refresh the products list
      await getProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }
  const handleDelete = async (id) => {
    try {
      const res = await productService.delete(id);
      console.log('Product deleted:', res.data);
      
      // Refresh the products list to remove the deleted item
      await getProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  return (
    <div className="app">
      <h1 className="title">I am the app and I'm mostly working!</h1>
      <ProductDisplay products={products} handleDelete={handleDelete} />
      <div className="submit-div">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name} 
            placeholder='name' 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="text" 
            value={price} 
            placeholder='price' 
            onChange={(e) => setPrice(e.target.value)} 
          />
          <input 
            type="text" 
            value={quantity} 
            placeholder='quantity' 
            onChange={(e) => setQuantity(e.target.value)} 
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
