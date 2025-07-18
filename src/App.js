import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import Form from './components/Form/Form';
import ProductList from './components/ProductList/ProductList';

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <div className="App">
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
