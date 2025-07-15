import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const { tg, user } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    const onClose = () => {
        tg.close();
    };

    return (
        <div className="App">
            {/* Telegram user info */}
            <div className="header">
                <span>Привет, @{user?.username || 'гость'}!</span>
                <button onClick={onClose} className="close-btn">Закрыть</button>
            </div>

            {/* Routes */}
            <Router>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/form" element={<Form />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
