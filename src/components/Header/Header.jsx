import React, { useState } from 'react';
import './Header.scss'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { RiHome5Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import TypeProduct from '../TypeProduct/TypeProduct';
import { useNavigate } from 'react-router-dom';
import { Badge, message } from 'antd';
import ModalSignIn from '../ModalSignIn/ModalSignIn';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'antd';
import { logout } from '../../redux/slices/userSlice';
import { jwtDecode } from "jwt-decode";



const Header = ({ style }) => {
    const [isShowModalSignIn, setIsShowModalSignIn] = useState(false)
    const arr = ['TV', 'Tủ lạnh', 'Laptop', 'Điện thoại', 'Quần áo']
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const access_token = localStorage.getItem('access_token')
    let isAdmin = ''
    let userId = ''
    if (access_token) {
        const decoded = jwtDecode(access_token);
        if (!decoded) {
            isAdmin = ''
            userId = ''
        }
        else {
            isAdmin = decoded?.payload?.isAdmin
            userId = decoded?.payload?.id
        }
    }
    else {
        userId = ''
        isAdmin = ''
    }

    const dispatch = useDispatch()

    const handleSignIn = () => {
        if (!user.isLoggedIn) {
            setIsShowModalSignIn(true)
        }
    }

    const handleLogOut = () => {
        localStorage.clear();
        dispatch(logout())
        navigate('/')
        message.info("Đăng xuất thành công!")
    }

    const handleIsAdminOrIsUser = async () => {
        if (!isAdmin) {
            console.log('Trung tâm hỗ trợ')
        }
        else {
            navigate('/system/admin')
        }
    }

    const handleViewProfileUser = async () => {
        navigate('/profile-user')
    }

    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => handleViewProfileUser()}>Thông tin tài khoản</div>
            ),
        },
        {
            key: '2',
            label: (
                <div>Đơn hàng của tôi</div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => handleIsAdminOrIsUser()}>
                    {!isAdmin ? "Trung tâm hỗ trợ" : "Trang quản trị"}
                </div>
            ),
        },
        {
            key: '4',
            danger: true,
            label: (
                <div onClick={() => handleLogOut()} >Đăng xuất</div>
            )
        },
    ];


    return (
        <>
            <ModalSignIn
                isShowModal={isShowModalSignIn}
                setIsShowModal={setIsShowModalSignIn}
            />
            <div className='header-container' style={style}>
                <div className='header-logo'>
                    <div className='logo' onClick={() => navigate('/')}></div>
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
                            onClick={() => navigate('/')}>
                            <RiHome5Fill className='icon' /> Trang chủ
                        </div>
                        {!user.isLoggedIn ?
                            <div className="account" onClick={() => handleSignIn()}>
                                <MdAccountCircle className='icon' /> Tài khoản
                            </div>
                            :
                            <Dropdown menu={{ items }}>
                                <div className={user.isLoggedIn === true ? 'account logged' : 'account'} onClick={() => handleSignIn()}>
                                    {user.avatar ?
                                        <div className='avatar'>
                                            <img alt="avatar" src={user.avatar} />
                                        </div>
                                        :
                                        <MdAccountCircle className={user.isLoggedIn === true ? 'icon logged' : 'icon'} />
                                    }
                                    Tài khoản
                                </div>
                            </Dropdown>
                        }

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
