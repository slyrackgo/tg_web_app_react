import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import './Form.css';

const Form = () => {
    const { tg } = useTelegram();
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const onSendData = useCallback(() => {
        const data = {
            city,
            address,
            phone
        };
        tg.sendData(JSON.stringify(data));
    }, [city, address, phone, tg]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        });
        tg.MainButton.onClick(onSendData);
        tg.MainButton.show();

        return () => {
            tg.MainButton.offClick(onSendData);
        };
    }, [onSendData, tg.MainButton]); // ✅ FIXED dependencies

    return (
        <div className="form">
            <h3>Введите ваши данные:</h3>
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
                placeholder="Телефон"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
        </div>
    );
};

export default Form;
