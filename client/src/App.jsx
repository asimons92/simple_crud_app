import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from '../context/AuthContext';
import { isTokenExpired } from '../services/api';
import { useProducts } from './hooks/useProducts';
import Navbar from './components/Navbar';
import ProductDisplay from './components/ProductDisplay';
import ProductForm from './components/ProductForm';

export default function App() {
  const { token, user, loading, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const { products, getProducts, createProduct, deleteProduct, updateProduct } = useProducts();
  
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
  }, [token, logout, getProducts]);

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show login page if not authenticated
  if (!token) {
    return showRegister ? <Register setShowRegister={setShowRegister} /> : <Login setShowRegister={setShowRegister} />;
  }

  const handleCreateProduct = async (product) => {
    await createProduct(product);
  };

  return (
    <div className="app">
      <Navbar user={user} onLogout={logout} />
      <ProductDisplay 
        products={products} 
        handleDelete={deleteProduct} 
        handleEdit={updateProduct} 
      />
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
}
