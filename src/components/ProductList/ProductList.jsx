import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import { useParams, useNavigate } from 'react-router-dom';

import pantsImg from '../../img/pants.png';
import shirtImg from '../../img/shirt.png';
import cardiganImg from '../../img/cardigan.png';
import shoesImg from '../../img/shoes.png';

const allProducts = [
    {
        id: '1',
        title: 'Брюки',
        price: 3600,
        description: 'Шикарные брюки в итальянском стиле',
        image: pantsImg,
        category: 'pants'
    },
    {
        id: '2',
        title: 'Батники',
        price: 2000,
        description: 'Классический аккуратный батник идущий в стиле old money, его стильный воротник добавляет образу серьезности и элегантности.',
        image: shirtImg,
        category: 'shirts'
    },
    {
        id: '3',
        title: 'Кардиганы',
        price: 3900,
        description: 'Очень теплый и мягкий, отлично подойдет на все случаи жизни, производство идёт Турция',
        image: cardiganImg,
        category: 'cardigans'
    },
    {
        id: '4',
        title: 'Обувь',
        price: 8200,
        description: 'Лоферы в красивом, богатом оттенке',
        image: shoesImg,
        category: 'shoes'
    }
];

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => acc + item.price, 0);
};

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg, queryId } = useTelegram();
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const filteredProducts = allProducts.filter(p => p.category === categoryId);

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        };
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }, [addedItems, queryId]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    const onAdd = (product) => {
        const newItems = [...addedItems, product];
        setAddedItems(newItems);

        tg.MainButton.show();
        tg.MainButton.setParams({
            text: `Купить ${getTotalPrice(newItems)} сом`
        });
    };

    const onRemove = (product) => {
        const index = addedItems.findIndex(item => item.id === product.id);
        if (index !== -1) {
            const newItems = [...addedItems];
            newItems.splice(index, 1);
            setAddedItems(newItems);

            if (newItems.length === 0) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.setParams({
                    text: `Купить ${getTotalPrice(newItems)} сом`
                });
            }
        }
    };

    const getQuantity = (productId) => {
        return addedItems.filter(item => item.id === productId).length;
    };

    return (
        <div className="list">
            <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
            {filteredProducts.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    quantity={getQuantity(item.id)}
                    className="item"
                />
            ))}
        </div>
    );
};

export default ProductList;
