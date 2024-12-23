import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import './HeaderComponent.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';

const HeaderComponent = (props) => {
    const { collapsed, setCollapsed } = props
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        localStorage.clear();
        dispatch(logout())
        navigate('/')
        message.info("Đăng xuất thành công!")
    }


    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => navigate('/')}>
                    Trang chủ
                </div>
            ),
        },
        {
            key: '2',
            danger: true,
            label: (
                <div onClick={() => handleLogOut()}>
                    Đăng xuất
                </div>
            )
        },
    ];
    return (
        <Header
            style={{
                padding: 0,
                paddingRight: "50px",
                background: colorBgContainer,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <Dropdown menu={{ items }}>
                <div className='user-infor'>
                    <div className='avatar'>
                        <img src={user?.avatar} />
                    </div>
                    <div className='account'>
                        Tài khoản
                    </div>
                </div>
            </Dropdown>
        </Header>
    );
};

export default HeaderComponent;


