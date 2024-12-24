import React, { useEffect, useState } from 'react';
import './HomePage.scss'
import HomeSliderComponent from '../../components/HomeSliderComponent/HomeSliderComponent';
import banner1 from '../../assets/image/banner1.jpg'
import banner2 from '../../assets/image/banner2.jpg'
import banner3 from '../../assets/image/banner3.jpg'
import banner12 from '../../assets/image/banner12.jpg'
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { Button, Spin } from 'antd';
import { getAllProduct } from '../../utils/productApi';

const HomePage = () => {

    const [listProduct, setListProduct] = useState()
    const [isLoadingProduct, setIsLoadingProduct] = useState(true)
    const [limit, setLimit] = useState(8)
    const [more, setMore] = useState(true)

    useEffect(() => {
        fetchAllProduct()
    }, [limit])

    const fetchAllProduct = async () => {
        const data = { limit }
        let res = await getAllProduct(data)
        setIsLoadingProduct(true)
        if (res.errCode === 0) {
            setIsLoadingProduct(false)
            setListProduct(res?.allProduct)
            if (res?.allProduct?.length >= limit) {
                setMore(false)
            }
            else {
                setMore(true)
            }
        }
    }

    return (
        <>
            <div className='homepage-container'>
                <div className='navbar-left'>
                    <NavbarComponent />
                </div>
                <div className='homepage-content-right'>
                    <div className='slider'>
                        <HomeSliderComponent arrImages={[banner1, banner2, banner3, banner12]} />
                    </div>
                    <div className='card-component'>
                        <Spin spinning={isLoadingProduct} tip="Loading..." className='spin'>
                            <CardComponent listProduct={listProduct} />
                        </Spin>
                    </div>
                    <div className='button-more' hidden={more}>
                        <Button onClick={() => setLimit(limit + 8)}
                            size="middle" style={{ width: '150px' }}>Xem thêm</Button>
                    </div>
                </div>

            </div>
        </>

    );
};

export default HomePage;
