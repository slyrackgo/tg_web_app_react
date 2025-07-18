import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

function App() {
    const { tg } = useTelegram(); 

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route index element={<ProductList />} />
                    <Route path="form" element={<Form />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
