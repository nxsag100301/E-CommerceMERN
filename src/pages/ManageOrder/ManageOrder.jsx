import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { getOrder } from '../../utils/orderApi';
import './ManageOrder.scss';
import { Select, Table } from 'antd';
import { RiBillLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all'); // Trạng thái lọc
    const access_token = localStorage.getItem('access_token');
    const navigate = useNavigate()
    let userId = '';

    if (access_token) {
        const decoded = jwtDecode(access_token);
        userId = decoded?.payload?.id || '';
    }

    useEffect(() => {
        fetchOrder();
    }, [filterStatus]); // Phụ thuộc vào filterStatus để gọi lại

    const fetchOrder = async () => {
        const res = await getOrder(userId);
        if (res?.errCode === 0) {
            let filteredOrders = res.order;

            switch (filterStatus) {
                case 'waitpay':
                    filteredOrders = filteredOrders.filter(order => !order.isPaid);
                    break;
                case 'pending':
                    filteredOrders = filteredOrders.filter(order => !order.isDelivered && order.isPaid);
                    break;
                case 'done':
                    filteredOrders = filteredOrders.filter(order => order.isDelivered && order.isPaid);
                    break;
                default:
                    break;
            }

            setOrders(filteredOrders);
        } else {
            console.log(res.message);
        }
    };

    const handleChange = (value) => {
        setFilterStatus(value); // Cập nhật filterStatus khi chọn trong Select
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'number',
            render: (text, record, index) => index + 1,
        },
        {
            title: `Tất cả (${orders?.length} đơn hàng)`,
            dataIndex: 'product',
            render: (product) => (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {product.map((item, index) => (
                        <div key={`product${index}`} className='product' style={{ display: "flex", alignItems: "center" }}>
                            <div className='produuct-img'>
                                <img
                                    style={{ height: "100px", width: "90px", marginRight: "10px" }}
                                    src={item.image}
                                    alt={item.name}
                                />
                            </div>
                            <div className='product-name' style={{ width: "180px" }}>
                                {item.name} <br /><b>x{item.amount}</b>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Thanh toán',
            dataIndex: 'isPaid',
            render: (paid) => (
                <div>
                    {paid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>
            ),
        },
        {
            title: 'Đã giao',
            dataIndex: 'isDelivered',
            render: (deliveried) => (
                <div>
                    {deliveried ? "Đã giao" : "Chưa giao"}
                </div>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            render: (totalPrice) => (
                <div style={{ color: "red" }}>
                    {totalPrice.toLocaleString('vi-VN')}₫
                </div>
            ),
        },
        ,
        {
            title: 'Chi tiết',
            key: 'action',
            render: (record) => (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <a onClick={() => navigate(`/detail-order/${record.key}`)}>Xem chi tiết</a>
                    <a style={{ color: "red" }}>Hủy đơn</a>
                </div>
            ),
        }
    ];

    const data = orders?.map((item) => ({
        key: item._id,
        product: item.orderItems,
        isPaid: item.isPaid,
        isDelivered: item.isDelivered,
        totalPrice: item.totalPrice,
    }));

    return (
        <div className='manage-order-container'>
            <div className='order-title'>
                Đơn hàng của tôi
            </div>
            <div className='manage-order-select'>
                <Select
                    defaultValue="all"
                    style={{ width: 150 }}
                    onChange={handleChange}
                    options={[
                        { value: 'all', label: 'Tất cả đơn' },
                        { value: 'waitpay', label: 'Chưa thanh toán' },
                        { value: 'pending', label: 'Chưa giao' },
                        { value: 'done', label: 'Đã hoàn thành' },
                    ]}
                />
            </div>
            <div className='manage-order-main-content'>
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                    locale={{
                        emptyText: (
                            <div style={{
                                height: "163px",
                                fontSize: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                            }}>
                                <RiBillLine style={{ fontSize: "25px" }} /> Không có đơn hàng
                            </div>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default ManageOrder;
