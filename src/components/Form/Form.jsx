import React, { useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        });
    }, [tg]);

    useEffect(() => {
        if (!city || !address || !phone) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [city, address, phone, tg]);

    return (
        <div>
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
