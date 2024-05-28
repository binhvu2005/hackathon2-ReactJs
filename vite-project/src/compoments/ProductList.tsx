import React from 'react';
import { Product } from './interfaces';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h1 className="panel-title">List Products</h1>
      </div>
      <div className="panel-body" id="list-product">
        {products.map((product, index) => (
          <div key={index} className="media product">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={product.image} alt={product.name} />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{product.name}</h4>
              <p>{product.description}</p>
              <p>Số lượng: {product.quantity}</p>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(product)}
                disabled={product.quantity === 0} 
              >
                {product.price}K $
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
