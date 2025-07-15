import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
  }, []);

  const onClose = () => {
    window.Telegram.WebApp.close();
  };

  return (
    <div className="App">
      <h1>Telegram Web App</h1>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
