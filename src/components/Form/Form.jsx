import React, { useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        });
    }, [tg]);

    useEffect(() => {
        if (!city || !street || !phone) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [city, street, phone, tg]);

    return (
        <div className="form">
            <h3>Введите ваши данные</h3>
            <input
                className='input'
                type="text"
                placeholder='Город'
                value={city}
                onChange={e => setCity(e.target.value)}
            />
            <input
                className='input'
                type="text"
                placeholder='Адрес'
                value={street}
                onChange={e => setStreet(e.target.value)}
            />
            <input
                className='input'
                type="tel"
                placeholder='Номер телефона'
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <select
                className="input"
                value={entity}
                onChange={e => setEntity(e.target.value)}
            >
                
            </select>
        </div>
    );
};

export default Form;
