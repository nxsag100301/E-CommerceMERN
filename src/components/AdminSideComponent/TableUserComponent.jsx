import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { getAllUser } from '../../utils/userApi';
import { debounce } from 'lodash';
import DetailUserModal from './AdminModal/DetailUserModal';
import DeleteUserModal from './AdminModal/DeleteUserModal';



const TableUserComponent = (props) => {
    const { valueSearch, actionSuccess, setActionSuccess } = props
    const [listUsers, setListUsers] = useState()
    const [limit, setLimit] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState()
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [isShowDelete, setIsShowDelete] = useState(false)
    const [userInfor, setUserInfor] = useState()

    useEffect(() => {
        if (!valueSearch || actionSuccess === true) {
            fetchAllUsers()
        }
        else {
            fetchFilterUser()
        }
        return () => {
            fetchFilterUser.cancel()
        };
    }, [valueSearch, currentPage, actionSuccess])

    const fetchFilterUser = debounce(async () => {
        const data = { limit, currentPage, filterBy: "name", filterValue: valueSearch }
        let res = await getAllUser(data)
        if (res?.errCode === 0) {
            setListUsers(res.allUserFilter.map(item => ({ ...item, key: item._id })));
            setTotalUsers(res.allUserFilter.length)
            setLimit(4)
        }
        else {
            console.log("Error from server")
        }
    }, 500)

    const fetchAllUsers = async () => {
        const data = { limit, currentPage }
        const res = await getAllUser(data)
        if (res?.errCode === 0) {
            setListUsers(res?.allUsers.map(item => ({ ...item, key: item._id })))
            setTotalUsers(res?.totalUsers)
            setActionSuccess(false)
            if (res?.allUsers?.length === 0) {
                setCurrentPage(+res?.currentPage - 1)
            }
        }
        else {
            console.log("Error from server")
            setActionSuccess(false)
        }

    }

    const handleDetailUser = (user) => {
        setUserInfor(user)
        setIsShowDetail(true)
    }

    const handleDeleteUser = (user) => {
        setUserInfor(user)
        setIsShowDelete(true)
    }

    const paginationConfig = {
        current: currentPage,
        pageSize: limit,
        total: totalUsers,
        onChange: (page, pageSize) => {
            setCurrentPage(page)
        },
    }
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Quyền',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (isAdmin) => (isAdmin ? 'Quản trị viên' : 'Người dùng'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleDetailUser(record)}
                        type='primary'>Chi tiết</Button>
                    <Button onClick={() => handleDeleteUser(record)}
                        type="primary" danger>Xóa</Button>
                </Space>
            ),
        },
    ]
    return (
        <>
            <DetailUserModal
                userInfor={userInfor}
                isShowDetail={isShowDetail}
                setIsShowDetail={setIsShowDetail}
                setActionSuccess={setActionSuccess}
            />
            <DeleteUserModal
                userInfor={userInfor}
                isShowDelete={isShowDelete}
                setIsShowDelete={setIsShowDelete}
                setActionSuccess={setActionSuccess}
            />
            <Table columns={columns} dataSource={listUsers} pagination={paginationConfig} />
        </>
    )
}

export default TableUserComponent;