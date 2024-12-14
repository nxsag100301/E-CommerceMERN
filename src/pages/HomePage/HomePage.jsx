import React from 'react';
import './HomePage.scss'
import HomeSliderComponent from '../../components/HomeSliderComponent/HomeSliderComponent';
import banner1 from '../../assets/image/banner1.jpg'
import banner2 from '../../assets/image/banner2.jpg'
import banner3 from '../../assets/image/banner3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { Button } from 'antd';

const HomePage = () => {
    return (
        <>
            <div className='homepage-container'>
                <div className='navbar-left'>
                    <NavbarComponent />
                </div>
                <div className='homepage-content-right'>
                    <div className='slider'>
                        <HomeSliderComponent arrImages={[banner1, banner2, banner3]} />
                    </div>
                    <div className='card-component'>
                        <CardComponent />
                    </div>

                    <div className='button-more'>
                        <Button size="middle" style={{ width: '150px' }}>Xem thêm</Button>
                    </div>
                </div>

            </div>
        </>

    );
};

export default HomePage;
