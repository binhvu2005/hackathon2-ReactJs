
import React from 'react';
import { CartItem } from './interfaces';
interface CartItemProps {
  item: CartItem;
  index: number;
  onUpdate: (index: number) => void;
  onDelete: (index: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, index, onUpdate, onDelete }) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{item.name}</td>
      <td>{item.price} USD</td>
      <td>
        <input name={`cart-item-quantity-${index}`} type="number" value={item.quantity} />
      </td>
      <td>
        <button className="label label-info update-cart-item" onClick={() => onUpdate(index)}>Update</button>
        <button className="label label-danger delete-cart-item" onClick={() => onDelete(index)}>Delete</button>
      </td>
    </tr>
  );
};

export default CartItemComponent;
