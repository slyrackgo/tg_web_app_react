import React from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [city, setCity] = useState('');

    useEffect(() => {
            tg.MainButton.setParams({
                text: 'Отправить данные'
            })
        }, [])

    //do not allow to send empty data    
    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    return (
        <div>
            <h3>Введите ваши данные</h3>
            <input className='input' 
            type="text" 
            placeholder='Город'
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
        </div>
    )
}

export default Form;