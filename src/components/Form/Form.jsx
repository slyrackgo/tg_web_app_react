import React, { useState, useCallback, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

const Form = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const { tg } = useTelegram();
  const MainButton = tg.MainButton;

  const onSendData = useCallback(() => {
    const data = { city, address, phone };
    tg.sendData(JSON.stringify(data));
  }, [city, address, phone, tg]);

  useEffect(() => {
    MainButton.setParams({ text: 'Отправить данные' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    MainButton.onClick(onSendData);
    MainButton.show();
    return () => MainButton.offClick(onSendData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form">
      <h3>Введите ваши данные</h3>
      <input
        className="input"
        type="text"
        placeholder="Город"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Адрес"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <input
        className="input"
        type="tel"
        placeholder="Номер телефона"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
    </div>
  );
};

export default Form;