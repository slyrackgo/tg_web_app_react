import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesPage.css';

const categories = [
    { id: 'shirts', name: 'Батники' },
    { id: 'pants', name: 'Брюки' },
    { id: 'tshirts', name: 'Футболки' },
    { id: 'sweaters', name: 'Свитера' },
    { id: 'cardigans', name: 'Кардиганы' },
    { id: 'vests', name: 'Безрукавки' },
    { id: 'jackets', name: 'Куртки' },
];

const CategoriesPage = () => {
    const navigate = useNavigate();

    const handleSelect = (categoryId) => {
        navigate(`/products/${categoryId}`);
    };

    return (
        <div className="categories-page">
            <h2>Выберите категорию</h2>
            <ul className="category-list">
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <button onClick={() => handleSelect(cat.id)} className="category-btn">
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesPage;
