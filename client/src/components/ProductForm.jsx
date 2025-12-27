import { useState } from 'react';

export default function ProductForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a product object from the form state
    const product = {
      name: name,
      price: Number(price),      // Convert string to number
      quantity: Number(quantity) // Convert string to number
    };
    
    await onSubmit(product);
    
    // Reset the form
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
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
  );
}

