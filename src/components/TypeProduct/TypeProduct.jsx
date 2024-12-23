import React from 'react';
import './TypeProduct.scss'
import { useNavigate } from 'react-router-dom';

const TypeProduct = (props) => {
    const navigate = useNavigate()
    const { name } = props
    return (
        <span className='type-product-container' onClick={() => navigate(`/product/${name}`)}>
            {name}
        </span>
    );
};

export default TypeProduct;
