import React, { useState } from 'react';
import { UserOutlined, } from '@ant-design/icons';
import { Menu } from 'antd';
import { AiOutlineProduct, AiOutlineDashboard } from "react-icons/ai";
import Sider from 'antd/es/layout/Sider';

const NavbarComponent = (props) => {
    const { collapsed, fetchAllProduct, fetAllUser, goDashboard } = props


    const manageDashboard = () => {
        goDashboard()
    }

    const manageUser = () => {
        fetAllUser()
    }

    const manageProduct = () => {
        fetchAllProduct()
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <AiOutlineDashboard onClick={manageDashboard} />,
                        label: <div onClick={manageDashboard}>Dashboard</div>,
                    },
                    {
                        key: '2',
                        icon: <UserOutlined onClick={manageUser} />,
                        label: <div onClick={manageUser}>Người dùng</div>,
                    },
                    {
                        key: '3',
                        icon: <AiOutlineProduct onClick={manageProduct} />,
                        label: <div onClick={manageProduct}>Sản phẩm</div>,
                    }
                ]}
            />
        </Sider>
    );
};

export default NavbarComponent;


