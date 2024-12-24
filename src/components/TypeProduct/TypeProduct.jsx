import React from 'react';
import './TypeProduct.scss'
import { useNavigate } from 'react-router-dom';

const TypeProduct = (props) => {
    const navigate = useNavigate()
    const { name, value } = props
    return (
        <span className='type-product-container' onClick={() => navigate(`/product/${value}`)}>
            {name}
        </span>
    );
};

export default TypeProduct;
