import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import logo from '../../img/logo.png'; // Make sure logo.png exists in /img/

const MainPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/products');
    };

    return (
        <div className="main-page">
            <img src={logo} alt="Store Logo" className="store-logo" />
            <h1 className="store-title">Магазин мужской одежды</h1>
            <p className="store-description">Доставка по всему КР</p>
            <button className="start-button" onClick={handleStart}>
                Перейти в каталог
            </button>
        </div>
    );
};

export default MainPage;
