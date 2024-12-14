import React from 'react';
import './TypeProduct.scss'

const TypeProduct = (props) => {
    const { name } = props
    return (
        <div className='type-product-container'>
            {name}
        </div>
    );
};

export default TypeProduct;
