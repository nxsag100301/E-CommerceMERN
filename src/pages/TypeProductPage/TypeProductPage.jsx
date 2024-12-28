import React, { useEffect, useState } from 'react';
import './TypeProductPage.scss'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { getAllProduct, getAllProductInStock } from '../../utils/productApi';

const TypeProductPage = () => {
    const [limit, setlimit] = useState(8)
    const [listProduct, setListProduct] = useState()
    const [more, setMore] = useState(true)
    const { type } = useParams()

    useEffect(() => {
        fetchProductByType()
    }, [type])

    const fetchProductByType = async () => {
        const data = { limit, currentPage: 1, filterBy: "type", filterValue: type }
        const res = await getAllProductInStock(data)
        if (res?.errCode === 0) {
            setListProduct(res?.products)
            if (res?.products?.length >= limit) {
                setMore(false)
            }
        }
        else {
            console.log(res?.message)
        }
    }

    return (
        <div className='type-product-container1'>
            <div className='product-navbar-left'>
                <NavbarComponent />
            </div>
            <div className='list-product-right'>
                <CardComponent listProduct={listProduct} />
                <div className='button-more' hidden={more}>
                    <Button size="middle" onClick={() => setlimit(limit + 8)}
                        style={{ width: '150px' }}>Xem thêm</Button>
                </div>
            </div>

        </div>
    );
};

export default TypeProductPage;
