
// each product
function Product() {
  return (
    <div className="product">
      <p>I am a product that will later be populated with an object from server.</p>
    </div>
  );
}

// the container for displaying products
function ProductDisplay() {
  return (
    <div className = "product-display">
      <table border={1}>
        <tr>
        <th> <h2>Products</h2> </th>
        </tr>
        <tr> 
          <td> <Product /> </td>
        </tr>
        <tr> 
          <td> <Product /> </td>
        </tr>
      </table>
    </div>
  );
}


//main app
export default function App() {
  return (
    <div className="app">
      <h1>I am the app and I'm mostly working!</h1>
      <ProductDisplay />
    </div>
  );
}
