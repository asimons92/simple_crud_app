import axios from 'axios';
import { useState } from 'react';
import { productService } from '../services/productsService';


const apiGet = () => {
  axios.get('http://localhost:3000').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}



// each product
function Product({ product } ) {
  return (
    <div className="product">
      <ul className="product-list">
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
      </ul>

    </div>
  );
}

// the container for displaying products
function ProductDisplay({ products }) {
  return (
    <div className = "product-display">
      {products.map((product) =>
        <Product key={product._id} product={product} />
      )}
    </div>
  );
}


//main app
export default function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await productService.getAll();
    setProducts(res.data);
  }
  
  return (
    <div className="app">
      <h1>I am the app and I'm mostly working!</h1>
      <ProductDisplay products={products} />
      <button onClick={ apiGet }>Make API Call</button>
      <button onClick={ getProducts}>Get Products</button>
    </div>
  );
}
