import { useState, useRef } from 'react';

export default function Product({ product, handleDelete, handleEdit }) {
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

