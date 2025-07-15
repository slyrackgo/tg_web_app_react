import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom' 
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';  

function App() {
    const { onToggleButton, tg, user } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    const onClose = () => {
        tg.close();
    };

    return (
        <div className="App">
            <Router>
              <Route index element={<ProductList/>}/>
              <Route path={'form'} element={<Form/>}/>
            </Router>
        </div>
    );
}

export default App;
