import { useState, useCallback } from 'react';
import { productService } from '../../services/productsService';

export function useProducts() {
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {   
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch (err) {
      console.log("Request failed, interceptor should handle redirect");
    }         
  }, []);

  const createProduct = async (product) => {
    try {
      const res = await productService.create(product);
      console.log('Product created:', res.data);
      await getProducts();
      return res;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await productService.delete(id);
      console.log('Product deleted:', res.data);
      await getProducts();
      return res;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await productService.update(id, updatedProduct);
      console.log('Product edited:', res.data);
      await getProducts();
      return res;
    } catch (error) {
      console.error('Error editing product:', error);
      throw error;
    }
  };

  return {
    products,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
  };
}

