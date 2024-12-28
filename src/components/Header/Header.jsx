import React from 'react';
import './Header.scss'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiHome5Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import TypeProduct from '../TypeProduct/TypeProduct';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, message } from 'antd';
import ModalSignIn from '../ModalSignIn/ModalSignIn';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'antd';
import { closeModal, logout, openModal } from '../../redux/slices/userSlice';
import { jwtDecode } from "jwt-decode";
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent';
import { clearCart } from '../../redux/slices/orderSlice';



const Header = ({ style }) => {
    const arr = [
        { label: 'TV', value: "tv" },
        { label: 'Tủ lạnh', value: "tulanh" },
        { label: 'Laptop', value: "laptop" },
        { label: 'Điện thoại', value: "dienthoai" },
        { label: 'Quần áo', value: "quanao" }
    ]
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const orderItem = useSelector((state) => state.order.orderItems);
    let productInCart = orderItem.length
    let isShowModal = user?.isShowModal
    const access_token = localStorage.getItem('access_token')
    const location = useLocation()
    let isAdmin = ''
    if (access_token) {
        const decoded = jwtDecode(access_token);
        if (!decoded) {
            isAdmin = ''
        }
        else {
            isAdmin = decoded?.payload?.isAdmin
        }
    }
    else {
        isAdmin = ''
    }

    const dispatch = useDispatch()

    const handleSignIn = () => {
        if (!user.isLoggedIn) {
            dispatch(openModal())
        }
    }

    const handleLogOut = () => {
        localStorage.clear();
        localStorage.removeItem('persist:root')
        dispatch(logout())
        dispatch(clearCart())
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

    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => navigate('/profile-user')}>Thông tin tài khoản</div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => navigate('/manage-order')}>
                    Đơn hàng của tôi
                </div>
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

    const handleCloseModal = () => {
        dispatch(closeModal())
    }

    const handleNavigateCart = () => {
        if (user?.isLoggedIn === false) {
            message.info("Vui lòng đăng nhập!")
            dispatch(openModal())
        }
        else {
            navigate('/cart')
        }
    }


    return (
        <>
            <ModalSignIn
                isShowModal={isShowModal}
                closeModal={handleCloseModal}
            />
            <div className='header-container' style={style}>
                <div className='header-logo'>
                    <div className='logo' onClick={() => navigate('/')}></div>
                    <div className='text'>
                        Tốt & Nhanh
                    </div>
                </div>
                <div className='header-content-center'>
                    <SearchBarComponent />
                    <div className='header-type-product'>
                        {arr.map((item) => {
                            return (
                                <TypeProduct name={item.label} key={item.value} value={item.value} />
                            )
                        })}
                    </div>
                </div>
                <div className='header-content-right'>
                    <div className='content-top'>
                        <div className={location.pathname === "/" ? "home-page active" : "home-page"}
                            onClick={() => navigate('/')}>
                            <RiHome5Fill className={location.pathname === "/" ? "icon active" : "icon"} /> Trang chủ
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
                        <div className='cart' onClick={() => handleNavigateCart()}>
                            <Badge count={+productInCart} size="medium" overflowCount={10}>
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
                                {user.address ? user.address : "Bạn muốn giao hàng tới đâu?"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
