import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

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
            <h3>Привет, {user?.username || 'пользователь'}!</h3>
            <button onClick={onClose}>Закрыть</button>
            <button onClick={onToggleButton}>toggle</button>
        </div>
    );
}

export default App;
