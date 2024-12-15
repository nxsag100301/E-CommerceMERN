import React from 'react';
import './TypeProductPage.scss'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Button } from 'antd';

const TypeProductPage = () => {
    return (
        <div className='type-product-container1'>
            <div className='product-navbar-left'>
                <NavbarComponent />
            </div>
            <div className='list-product-right'>
                <CardComponent />
                <div className='button-more'>
                    <Button size="middle" style={{ width: '150px' }}>Xem thêm</Button>
                </div>
            </div>

        </div>
    );
};

export default TypeProductPage;
