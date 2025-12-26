import { useState, useEffect, useRef } from 'react';
import { productService } from '../services/productsService';
import Login from './pages/Login';
import { useAuth } from '../context/AuthContext';
import { isTokenExpired } from '../services/api';



// each product
function Product({ product, handleDelete, handleEdit } ) {
  const dialogRef = useRef(null);
  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState(product.price.toString());
  const [editQuantity, setEditQuantity] = useState(product.quantity.toString());

  const openEditWindow = () => {
    // Reset form values to current product values when opening
    setEditName(product.name);
    setEditPrice(product.price.toString());
    setEditQuantity(product.quantity.toString());
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeEditWindow = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    // Create an updated product object from the form state
    const updatedProduct = {
      name: editName,
      price: Number(editPrice),      // Convert string to number
      quantity: Number(editQuantity) // Convert string to number
    };
    
    // Call handleEdit with the product ID and updated data
    await handleEdit(product._id, updatedProduct);
    
    // Close the dialog after successful edit
    closeEditWindow();
  };

  return (
    <div className="product">
      <ul className="product-list">
        <li className="product-name">{product.name}</li>
        <li className="product-price">Price: ${product.price}</li>
        <li className="product-quantity">Quantity: {product.quantity}</li>
      </ul>
      
      <div className="button-container">
        <button 
          type="button" 
          className='edit-button'
          onClick={openEditWindow}
        >
          Edit
        </button>
        <button 
          type="button" 
          className='delete-button'
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </button>
      </div>
      
      <dialog ref={dialogRef}>
        <p>Editing {product.name}</p>
        <form onSubmit={handleSubmitEdit}>
          <input 
              type="text" 
              value={editName} 
              placeholder={product.name}
              onChange={(e) => setEditName(e.target.value)} 
            />
          <input 
              type="text" 
              value={editPrice} 
              placeholder={product.price}
              onChange={(e) => setEditPrice(e.target.value)} 
          />
          <input 
              type="text" 
              value={editQuantity} 
              placeholder={product.quantity}
              onChange={(e) => setEditQuantity(e.target.value)} 
          />
          <button type="submit">Save</button>
          <button type="button" onClick={closeEditWindow}>Cancel</button>
        </form>
      </dialog>

    </div>
  );
}

// the container for displaying products
function ProductDisplay({ products, handleDelete, handleEdit }) {
  return (
    <div className = "product-display">
      {products?.map((product) =>
        <Product 
          key={product._id} 
          product={product} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}


//main app
export default function App() {
  const { token, loading, logout } = useAuth();
  const [products, setProducts] = useState([]); // holds all products
  const [name, setName] = useState('');         // for creating new product
  const [price, setPrice] = useState('');       // for creating new product
  const [quantity, setQuantity] = useState(''); // for creating new product
  const getProducts = async () => {   
    try {
      const res = await productService.getAll(); // sets products to all products
      setProducts(res.data);
    } catch (err) {
      console.log("Request failed, interceptor should handle redirect");

    }         

  }
  
  // Call getProducts when component first loads and when token is available
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      // Token is expired, clear it and redirect to login
      logout();
      window.location.href = '/login';
    } else if (token && !isTokenExpired(token)) {
      // Token is valid, fetch products
      getProducts();
    }
  }, [token, logout])

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show login page if not authenticated
  if (!token) {
    return <Login />;
  }
  
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
  const handleEdit = async (id, updatedProduct) => {
    try {
      const res = await productService.update(id, updatedProduct);
      console.log('Product edited:', res.data);
      
      // Refresh the products list to show the updated item
      await getProducts();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  }



  return (


    <div className="app">
      <h1 className="title">Simple CRUD App Frontend</h1>

      <ProductDisplay products={products} handleDelete={handleDelete} handleEdit={handleEdit} />
      <div className="submit-div">
        <form onSubmit={handleSubmit}>
          <input 
            className="edit-field"
            type="text" 
            value={name} 
            placeholder='name' 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            className='edit-field'
            type="text" 
            value={price} 
            placeholder='price' 
            onChange={(e) => setPrice(e.target.value)} 
          />
          <input 
            className='edit-field'
            type="text" 
            value={quantity} 
            placeholder='quantity' 
            onChange={(e) => setQuantity(e.target.value)} 
          />
          <button type="submit" className='submit-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}
