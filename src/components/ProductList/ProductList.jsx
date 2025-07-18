import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Брюки', price: 3600, description: 'Шикарные брюки в итальянском стиле'},
    {id: '2', title: 'Батники', price: 2000, description: 'Классический аккуратный батник идущий в стиле old money, его стильный воротник добавляет образу серьезности и элегантности.'},
    {id: '3', title: 'Кардиганы', price: 3900, description: ' Очень теплый и мягкий, отлично подойдет на все случаи жизни, производство идёт Турция'},
    {id: '4', title: 'Обувь', price: 8200, description: 'Лоферы в красивом, богатом оттенке'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}


const ProductList = () => {

    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

   const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])
    
    const onAdd = (product) =>{
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className={"list"}>
            {products.map(item =>(
                <ProductItem
                product={item}
                onAdd={onAdd}
                className={"item"}
                />
            ))}
        </div>
    );
};

export default ProductList;