import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Dropdown } from 'antd';
import { debounce } from 'lodash';
import { getAllProductInStock } from '../../utils/productApi';
import './SearchBarComponent.scss'
import { useNavigate } from 'react-router-dom';

const SearchBarComponent = () => {
    const [filterValue, setFilterValue] = useState()
    const [listProduct, setListProduct] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (filterValue) {
            fetchFilterProduct()
        }
        else (
            setListProduct([])
        )
        return () => {
            fetchFilterProduct.cancel()
        };
    }, [filterValue])

    const fetchFilterProduct = debounce(async () => {
        const data = { limit: 5, currentPage: 1, filterBy: "name", filterValue: filterValue }
        let res = await getAllProductInStock(data)
        if (res?.errCode === 0) {
            setListProduct(res?.products?.map(item => ({ ...item, key: item._id })));
        }
        else {
            console.log("Error from server")
        }
    }, 300)



    const items = listProduct?.map((item) => ({
        key: item._id.toString(),
        label: (
            <div className='item-search' onClick={() => navigate(`/detail-product/${item._id}`)}>
                <div className='image-item'>
                    <img alt={item.name} src={item.image} />
                </div>
                <div className='info-item'>
                    <div className='name-item'>
                        {item.name}
                    </div>
                    <div className='price-item'>
                        {item.price.toLocaleString('vi-VN')} &#8363;
                    </div>
                </div>
            </div>
        ),
    }));
    return (
        <Dropdown trigger={"click"}
            menu={{ items }}
        >
            <div className='header-search'>
                <div className='search-bar'>
                    <IoIosSearch className='icon' />
                    <input placeholder='Tìm kiếm sản phẩm' value={filterValue} onChange={(event) => setFilterValue(event.target.value)} />
                </div>
                <div className='search-button'>
                    <button>Tìm kiếm</button>
                </div>
            </div>
        </Dropdown>
    );
};

export default SearchBarComponent;


