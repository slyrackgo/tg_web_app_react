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
      <Header/>
      <button onClick={ontoggleButton}>toggle</button>
    </div>
  );
}

export default App;
