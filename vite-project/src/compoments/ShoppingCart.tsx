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

  const [intermediateCartItems, setIntermediateCartItems] = useState<CartItem[]>([]);
  const [intermediateProducts, setIntermediateProducts] = useState<Product[]>([]);

  const [notification, setNotification] = useState<{ message: string, variant: string } | null>(null);

  useEffect(() => {
    setIntermediateCartItems(cartItems);
    setIntermediateProducts(products);
  }, [cartItems, products]);

  const handleAddToCart = (product: Product) => {
    const existingItemIndex = intermediateCartItems.findIndex(item => item.name === product.name);
    const updatedCartItems = [...intermediateCartItems];
    const updatedProducts = [...intermediateProducts];

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems.push({ name: product.name, price: product.price, quantity: 1 });
    }

    const productIndex = updatedProducts.findIndex(p => p.name === product.name);
    if (productIndex !== -1) {
      updatedProducts[productIndex].quantity -= 1;
    }

    setIntermediateCartItems(updatedCartItems);
    setIntermediateProducts(updatedProducts);

    setNotification({ message: 'Added to cart successfully', variant: 'success' });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    const updatedCartItems = [...intermediateCartItems];
    const updatedProducts = [...intermediateProducts];

    const cartItem = updatedCartItems[index];
    const productIndex = updatedProducts.findIndex(p => p.name === cartItem.name);

    const difference = newQuantity - cartItem.quantity;

    if (productIndex !== -1 && difference > updatedProducts[productIndex].quantity) {
      setNotification({ message: 'Out of stock', variant: 'danger' });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    if (productIndex !== -1) {
      updatedProducts[productIndex].quantity -= difference;
    }

    updatedCartItems[index].quantity = newQuantity;
    setIntermediateCartItems(updatedCartItems);
    setIntermediateProducts(updatedProducts);
  };

  const handleUpdate = () => {
    setCartItems(intermediateCartItems);
    setProducts(intermediateProducts);
    localStorage.setItem('cartItems', JSON.stringify(intermediateCartItems));
    localStorage.setItem('productItems', JSON.stringify(intermediateProducts));
    setNotification({ message: 'Cart updated successfully', variant: 'warning' });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleDelete = (index: number) => {
    const removedItem = intermediateCartItems[index];
    const productIndex = intermediateProducts.findIndex(p => p.name === removedItem.name);

    const updatedCartItems = intermediateCartItems.filter((_, i) => i !== index);
    const updatedProducts = [...intermediateProducts];

    if (productIndex !== -1) {
      updatedProducts[productIndex].quantity += removedItem.quantity;
    }

    setIntermediateCartItems(updatedCartItems);
    setIntermediateProducts(updatedProducts);

    setNotification({ message: 'Deleted successfully', variant: 'danger' });
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
          <ProductList products={intermediateProducts} onAddToCart={handleAddToCart} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <Cart cartItems={intermediateCartItems} onUpdateQuantity={handleUpdateQuantity} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;