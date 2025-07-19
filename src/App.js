import './App.css';
import React, { useEffect } from 'react';
import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from 'react-router-dom';

import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import MainPage from "./components/MainPage/MainPage"; // 👈 Add this

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} /> {/* Main page */}
                <Route path="/products" element={<ProductList />} />
            </Routes>
        </div>
    );
}

export default App;
