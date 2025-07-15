import './Header.css';

const tg = window.Telegram.WebApp || {};

export function useTelegram() {
    const onToggleButton = () => {
        if (tg.MainButton?.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    };

    return {
        tg,
        onToggleButton,
        user: tg.initDataUnsafe?.user || null,
    };
}


const Header = () => {
    const { user } = useTelegram();

    return (
        <div className="header">
            <h1>Welcome {user?.first_name || 'Guest'}</h1>
        </div>
    );
};

export default Header;
