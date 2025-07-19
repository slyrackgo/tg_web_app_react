import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd, onRemove, quantity = 0 }) => {
    const handleAdd = () => {
        onAdd(product);
    };

    const handleRemove = () => {
        onRemove(product);
    };

    return (
        <div className={'product ' + className}>
            <img
                src={product.image}
                alt={product.title}
                className="product-img"
            />
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <div className="quantity-controls">
                <button className="quantity-btn" onClick={onRemoveHandler}>-</button>
                <div className="quantity-count">{quantity}</div>
                <button className="quantity-btn" onClick={onAddHandler}>+</button>
            </div>

        </div>
    );
};

export default ProductItem;
