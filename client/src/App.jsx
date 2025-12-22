import axios from 'axios';
import { useState } from 'react';


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
      <h3>{product.name}</h3>
      <p>{product.price}</p>
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
  const apiGetProducts = () => {
    axios.get('http://localhost:3000/api/products').then((res) => {
      console.log(res)
      console.log(res.data)
      setProducts(res.data);
  
    })
  }
  return (
    <div className="app">
      <h1>I am the app and I'm mostly working!</h1>
      <ProductDisplay products={products} />
      <button onClick={ apiGet }>Make API Call</button>
      <button onClick={ apiGetProducts}>Get Products</button>
    </div>
  );
}
