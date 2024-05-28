// Cart.tsx
import React from 'react';
import { CartItem } from './interfaces';

interface CartProps {
  cartItems: CartItem[];
  onUpdate: (index: number, quantity: number) => void;
  onDelete: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdate, onDelete }) => {
  const handleQuantityChange = (index: number, quantity: number) => {
    onUpdate(index, quantity);
  };

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">
        <h1 className="panel-title">Your Cart</h1>
      </div>
      <div className="panel-body">
        <table className="table">
          <thead>
          <tr>
            <th style={{ width: '4%' }}>STT</th>
              <th>Name</th>
              <th style={{ width: '15%' }}>Price</th>
              <th style={{ width: '4%' }}>Quantity</th>
              <th style={{ width: '25%' }}>Action</th>
            </tr>
          </thead>
          <tbody id="my-cart-body">
            {cartItems.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.price}K USD</td>
                <td>
                  <input
                    name={`cart-item-quantity-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                  />
                </td>
                <td>
                  <button className="btn btn-info" onClick={() => onUpdate(index, item.quantity)}>Update</button>
                  <button className="btn btn-danger" onClick={() => onDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot id="my-cart-footer">
            <tr>
              <td colSpan={4}>
                {cartItems.length > 0
                  ? `có ${cartItems.length} sản phẩm trong giỏ hàng`
                  : 'Chưa có sản phẩm trong giỏ hàng'}
              </td>
              <td colSpan={2} className="total-price text-left">
                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} USD
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Cart;
