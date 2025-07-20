import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

import pantsImg from '../../img/pants.png';
import shirtImg from '../../img/shirt.png';
import cardiganImg from '../../img/cardigan.png';
import shoesImg from '../../img/shoes.png';

const products = [
    {
        id: '1',
        title: 'Брюки',
        price: 3600,
        description: 'Шикарные брюки в итальянском стиле',
        image: pantsImg
    },
    {
        id: '2',
        title: 'Батники',
        price: 2000,
        description: 'Классический аккуратный батник идущий в стиле old money, его стильный воротник добавляет образу серьезности и элегантности.',
        image: shirtImg
    },
    {
        id: '3',
        title: 'Кардиганы',
        price: 3900,
        description: 'Очень теплый и мягкий, отлично подойдет на все случаи жизни, производство идёт Турция',
        image: cardiganImg
    },
    {
        id: '4',
        title: 'Обувь',
        price: 8200,
        description: 'Лоферы в красивом, богатом оттенке',
        image: shoesImg
    }
];

// 🧠 Helper to calculate total
const getTotalPrice = (itemsMap) => {
    return Object.values(itemsMap).reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);
};

const ProductList = () => {
    const [cartItems, setCartItems] = useState({});
    const { tg, queryId } = useTelegram();

    const onSendData = useCallback(() => {
        const itemsArray = Object.values(cartItems).map(item => ({
            ...item.product,
            quantity: item.quantity
        }));

        const data = {
            products: itemsArray,
            totalPrice: getTotalPrice(cartItems),
            queryId,
        };

        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }, [cartItems, queryId]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    const updateMainButton = (items) => {
        const total = getTotalPrice(items);
        if (total === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить на ${total} сом`
            });
        }
    };

    const onAdd = (product) => {
        setCartItems(prev => {
            const newItems = { ...prev };
            if (newItems[product.id]) {
                newItems[product.id].quantity += 1;
            } else {
                newItems[product.id] = { product, quantity: 1 };
            }
            updateMainButton(newItems);
            return newItems;
        });
    };

    const onRemove = (product) => {
        setCartItems(prev => {
            const newItems = { ...prev };
            if (newItems[product.id]) {
                newItems[product.id].quantity -= 1;
                if (newItems[product.id].quantity <= 0) {
                    delete newItems[product.id];
                }
            }
            updateMainButton(newItems);
            return newItems;
        });
    };

    const getQuantity = (productId) => {
        return cartItems[productId]?.quantity || 0;
    };

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    quantity={getQuantity(item.id)}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
