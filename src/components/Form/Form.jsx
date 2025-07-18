import React, { useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [phone, setPhone] = useState('');
  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({ text: 'Отправить данные' });
 
  }, []);

  useEffect(() => {
    if (!city || !street || !phone) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [city, street, phone]);

  return (
    <div className="form">
      <h3>Введите ваши данные</h3>
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="Город" className="input" />
      <input value={street} onChange={e => setStreet(e.target.value)} placeholder="Адрес" className="input" />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Номер телефона" className="input" type="tel" />
    </div>
  );
};

export default Form;
