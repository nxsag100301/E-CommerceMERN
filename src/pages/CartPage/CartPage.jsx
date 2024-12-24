import React, { useState } from 'react';
import { Divider, Space, Table } from 'antd';
import './CartPage.scss'
import { DeleteOutlined } from '@ant-design/icons';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CartPage = () => {
    const [amount, setAmount] = useState(1)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const columns = [
        {
            title: 'Tất cả (2 sản phẩm)',
            dataIndex: 'product',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (amount) => (
                <div className='button-p-m' style={{ position: "relative", top: "6px" }}>
                    <div className='btn-plus'>
                        <FaPlus className='icon' />
                    </div>
                    <div className='count'>
                        {amount}
                    </div>
                    <div className="btn-minus"
                    // className={`btn-minus ${productQuantity === 1 ? 'disabled' : ''}`}
                    >
                        <FaMinus className='icon' />
                    </div>
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
        },
        {
            title: <DeleteOutlined />,
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <DeleteOutlined />
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            product: <div className='product' style={{ display: "flex", alignItems: "center" }}>
                <div className='produuct-img'>
                    <img style={{ height: "100px", width: "90px", marginRight: "10px" }}
                        src="https://salt.tikicdn.com/cache/750x750/ts/product/3b/95/ec/5b2c7ec0e09565f399a0a184bd71696b.png.webp" />
                </div>
                <div className='product-name'>
                    Apple Iphone 14
                </div>
            </div>,
            price: <p style={{ fontWeight: "500" }}>1.000.000₫</p>,
            amount: amount,
            total: <p style={{ color: "red", fontWeight: "500" }}>1.000.000₫</p>
        },
        {
            key: '2',
            product: <div className='product' style={{ display: "flex", alignItems: "center" }}>
                <div className='produuct-img'>
                    <img style={{ height: "100px", width: "90px", marginRight: "10px" }}
                        src="https://salt.tikicdn.com/cache/750x750/ts/product/3b/95/ec/5b2c7ec0e09565f399a0a184bd71696b.png.webp" />
                </div>
                <div className='product-name'>
                    Apple Iphone 14
                </div>
            </div>,
            price: <p style={{ fontWeight: "500" }}>1.000.000₫</p>,
            amount: amount,
            total: <p style={{ color: "red", fontWeight: "500" }}>1.000.000₫</p>
        },
        {
            key: '3',
            product: <div className='product' style={{ display: "flex", alignItems: "center" }}>
                <div className='produuct-img'>
                    <img style={{ height: "100px", width: "90px", marginRight: "10px" }}
                        src="https://salt.tikicdn.com/cache/750x750/ts/product/3b/95/ec/5b2c7ec0e09565f399a0a184bd71696b.png.webp" />
                </div>
                <div className='product-name'>
                    Apple Iphone 14
                </div>
            </div>,
            price: <p style={{ fontWeight: "500" }}>1.000.000₫</p>,
            amount: amount,
            total: <p style={{ color: "red", fontWeight: "500" }}>1.000.000₫</p>
        }
    ];
    return (
        <div className='cart-page-container'>
            <div className='cart-title'>
                Giỏ hàng
            </div>
            <div className='cart-main-content'>
                <div className='cart-content-left'>
                    <div className='cart-content'>
                        <Table
                            pagination={false}
                            rowSelection={{
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={data}
                        />
                    </div>
                </div>
                <div className='cart-content-right'>
                    <div className='content-top'>
                        <div className='text'>
                            <div className='title'>
                                Tạm tính
                            </div>
                            <div className='price'>
                                0
                            </div>
                        </div>
                        <div className='text'>
                            <div className='title'>
                                Giảm giá
                            </div>
                            <div className='price'>
                                0
                            </div>
                        </div>
                        <div className='text'>
                            <div className='title'>
                                Thuế
                            </div>
                            <div className='price'>
                                0
                            </div>
                        </div>
                        <div className='text'>
                            <div className='title'>
                                Phí giao hàng
                            </div>
                            <div className='price'>
                                0
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className='content-bot'>
                        <div className='total-price'>
                            <div className='title'>
                                Tổng tiền
                            </div>
                            <div className='total'>
                                1.000.000₫
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;



