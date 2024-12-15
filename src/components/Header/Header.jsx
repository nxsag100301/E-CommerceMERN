import React, { useState } from 'react';
import './Header.scss'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { RiHome5Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import TypeProduct from '../TypeProduct/TypeProduct';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import ModalSignIn from '../ModalSignIn/ModalSignIn';

const Header = ({ style }) => {
    const [isShowModalSignIn, setIsShowModalSignIn] = useState(false)
    const arr = ['TV', 'Tủ lạnh', 'Laptop', 'Điện thoại', 'Quần áo']
    const router = useNavigate()
    return (
        <>
            <ModalSignIn
                isShowModal={isShowModalSignIn}
                setIsShowModal={setIsShowModalSignIn}
            />
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
                            <IoIosSearch className='icon' />
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
                        <div className='home-page'
                            onClick={() => router('/')}>
                            <RiHome5Fill className='icon' /> Trang chủ
                        </div>
                        <div className='account' onClick={() => setIsShowModalSignIn(true)}>
                            <MdAccountCircle className='icon' /> Tài khoản
                        </div>
                        <div className='border'></div>
                        <div className='cart'>
                            <Badge count={11} size="small" overflowCount={10}>
                                <AiOutlineShoppingCart className='icon' />
                            </Badge>
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
        </>
    );
};

export default Header;
