import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import NavbarComponent from '../../../components/AdminSideComponent/NavbarComponent';
import HeaderComponent from '../../../components/AdminSideComponent/HeaderComponent';
import MainContentComponent from '../../../components/AdminSideComponent/MainContentComponent';

const AdminPage = () => {
    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_token')
    const [collapsed, setCollapsed] = useState(false);
    const [caseNav, setCaseNav] = useState('dashboard')

    let isAdmin = false
    if (access_token) {
        const decoded = jwtDecode(access_token);
        if (!decoded) {
            isAdmin = false
        }
        else {
            isAdmin = decoded?.payload?.isAdmin
        }
    }
    else {
        isAdmin = false
    }

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
        }
    }, [isAdmin])

    const fetchAllProduct = async () => {
        setCaseNav('product')

    }

    const fetAllUser = async () => {
        setCaseNav('user')
    }

    const goDashboard = async () => {
        setCaseNav('dashboard')
    }
    return (
        <Layout style={{ height: '100vh' }}>
            <NavbarComponent
                collapsed={collapsed}
                fetchAllProduct={fetchAllProduct}
                fetAllUser={fetAllUser}
                goDashboard={goDashboard}
            />
            <Layout>
                <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
                <MainContentComponent caseNav={caseNav}
                />
            </Layout>
        </Layout>
    );
};

export default AdminPage;


