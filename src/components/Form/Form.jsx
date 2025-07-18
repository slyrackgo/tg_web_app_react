import {useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";


const Form = () => {
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const { tg } = useTelegram();

    const onChangeCity = (e) => setCity(e.target.value);
    const onChangeStreet = (e) => setStreet(e.target.value);
    const onChangePhone = (e) => setPhone(e.target.value);

useEffect(() => {
    const mainButton = tg.MainButton;
    mainButton.setParams({ 
        text: 'Отправить данные' 
    });
}, [tg.MainButton]); 

 useEffect(() => {
    const mainButton = tg.MainButton;
    if (!city || !street || !phone) {
        mainButton.hide();
    } else {
        mainButton.show();
    }
}, [city, street, phone, tg.MainButton]); 

    return (
        <div>
            <h3>Введите ваши данные</h3>
            <input
                className='input'
                type="text"
                placeholder='Город'
                value={city}
                onChange={onChangeCity}
            />
            <input
                className='input'
                type="text"
                placeholder='Адрес'
                value={street}
                onChange={onChangeStreet}
            />
            <input
                className='input'
                type="tel"
                placeholder='Номер телефона'
                value={phone}
                onChange={onChangePhone}
            />
        </div>
    );
};

export default Form;