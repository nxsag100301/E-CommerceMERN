import React from 'react';
import './Header.scss'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { RiHome5Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import TypeProduct from '../TypeProduct/TypeProduct';
import { useNavigate } from 'react-router-dom';

const Header = ({ style }) => {
    const arr = ['TV', 'Tủ lạnh', 'Laptop', 'Điện thoại', 'Quần áo']
    const router = useNavigate()
    return (
        <div className='header-container' style={style}>
            <div className='header-logo'>
                <div className='logo' onClick={() => router('/')}></div>
                <div className='text'>
                    Tốt & Nhanh
                </div>
            </div>
            <div className='header-content-center'>
                <div className='header-search'>
                    <div className='search-bar'>
                        <IoIosSearch class='icon' />
                        <input placeholder='Search something' />
                    </div>
                    <div className='search-button'>
                        <button>Tìm kiếm</button>
                    </div>
                </div>
                <div className='header-type-product'>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </div>
            </div>
            <div className='header-content-right'>
                <div className='content-top'>
                    <div className='home-page'>
                        <RiHome5Fill className='icon' /> Trang chủ
                    </div>
                    <div className='account'>
                        <MdAccountCircle className='icon' /> Tài khoản
                    </div>
                    <div className='border'></div>
                    <div className='cart'>
                        <AiOutlineShoppingCart className='icon' />
                    </div>
                </div>
                <div className='content-bottom'>
                    <div className='text'>
                        <div className='text1'>
                            <GiPositionMarker />Giao đến:
                        </div>
                        <div className='text2'>
                            Bạn muốn giao hàng tới đâu?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
