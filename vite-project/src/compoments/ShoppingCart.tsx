import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './interfaces';
import ProductList from './ProductList';
import Cart from './Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
// const initialProducts: Product[] = [
//   {
//     name: 'Đân Lề',
//     price: 30,
//     quantity: 1,
//     image: 'https://th.bing.com/th/id/OIP.vxwokGs8A4Sgs4ayIiZxzwHaKk?rs=1&pid=ImgDetMain',
//     description: 'Đại học Ngoại Thương ,xinh gái, ưa nhìn,ngọt từ xương!',
//   },
//   {
//     name: 'Phạm Quang Dũng',
//     price: 15,
//     quantity: 4,
//     image: 'https://th.bing.com/th/id/OIP.VnHgSOj9_txG0_MSgwqg9QHaNK?rs=1&pid=ImgDetMain',
//     description: 'Đại học Ngoại Thương ,xinh gái, ưa nhìn,ngọt từ xương!',
//   },
//   {
//     name: 'Nguyễn Đỗ Huy Hoàng',
//     price: 20,
//     quantity: 0,
//     image: 'https://i.pinimg.com/736x/f4/cf/0c/f4cf0c5cff1267d89644af50ea301557.jpg',
//     description: 'Đại học Ngoại Thương ,xinh gái, ưa nhìn,ngọt từ xương!',
//   },
//   {
//     name: 'Nguyễn Gia Thiều',
//     price: 10,
//     quantity: 1,
//     image: 'https://th.bing.com/th/id/OIP.RBbTwgbVmva_AQvqf36SmQHaLH?pid=ImgDet&w=204&h=306&c=7&dpr=2',
//     description: 'Đại học Ngoại Thương ,xinh gái, ưa nhìn,ngọt từ xương!',
//   }
// ];
// localStorage.setItem('productItems', JSON.stringify(initialProducts));
const ShoppingCart: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(() => {
      const savedItems = localStorage.getItem('productItems');
      return savedItems ? JSON.parse(savedItems) : [];
    });
  
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
      const savedItems = localStorage.getItem('cartItems');
      return savedItems ? JSON.parse(savedItems) : [];
    });
  
    const [notification, setNotification] = useState<{ message: string, variant: string } | null>(null);
  
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
  
    useEffect(() => {
      localStorage.setItem('productItems', JSON.stringify(products));
    }, [products]);
  
    const handleAddToCart = (product: Product) => {
      const existingItemIndex = cartItems.findIndex(item => item.name === product.name);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { name: product.name, price: product.price, quantity: 1 }]);
      }
  
      const updatedProducts = products.map(p => {
        if (p.name === product.name) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      });
      setProducts(updatedProducts);
  
      setNotification({ message: 'Add to cart successfully', variant: 'success' });
      setTimeout(() => setNotification(null), 2000);
    };
  
    const handleUpdate = (index: number, newQuantity: number) => {
      if (newQuantity < 0) {
        setNotification({ message: 'Quantity cannot be negative', variant: 'danger' });
        setTimeout(() => setNotification(null), 2000);
        return;
      }
  
      const cartItem = cartItems[index];
      const productIndex = products.findIndex(p => p.name === cartItem.name);
      const product = products[productIndex];
  
      if (newQuantity > (product.quantity + cartItem.quantity)) {
        setNotification({ message: 'Out of stock', variant: 'danger' });
        setTimeout(() => setNotification(null), 2000);
        return;
      }
  
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
  
      const updatedProducts = [...products];
      updatedProducts[productIndex].quantity = product.quantity + cartItem.quantity - newQuantity;
      setProducts(updatedProducts);
  
      setNotification({ message: 'Update successfully', variant: 'warning' });
      setTimeout(() => setNotification(null), 2000);
    };
  
    const handleDelete = (index: number) => {
      const removedItem = cartItems[index];
      const productIndex = products.findIndex(p => p.name === removedItem.name);
  
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
  
      const updatedProducts = [...products];
      updatedProducts[productIndex].quantity += removedItem.quantity;
      setProducts(updatedProducts);
  
      setNotification({ message: 'Delete successfully', variant: 'danger' });
      setTimeout(() => setNotification(null), 2000);
    };
  
    return (
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        {notification && (
          <Alert variant={notification.variant} onClose={() => setNotification(null)} dismissible>
            {notification.message}
          </Alert>
        )}
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <ProductList products={products} onAddToCart={handleAddToCart} />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <Cart cartItems={cartItems} onUpdate={handleUpdate} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    );
  };
  
  export default ShoppingCart;