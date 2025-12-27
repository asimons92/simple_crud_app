import Product from './Product';

export default function ProductDisplay({ products, handleDelete, handleEdit }) {
  return (
    <div className="product-display">
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

