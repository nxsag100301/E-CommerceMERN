import React, { useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import './CartPage.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BsCartX } from "react-icons/bs";
import {
    minusAmountOrderProduct,
    plusAmountOrderProduct,
    removeOrderProduct,
    removeSelectedProduct
} from '../../redux/slices/orderSlice';

const CartPage = () => {
    const orderItem = useSelector((state) => state.order.orderItems);
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const total = selectedItems.reduce((acc, item) => {
            const updatedItem = orderItem.find((i) => i.productId === item.key);
            if (updatedItem) {
                return acc + updatedItem.price * updatedItem.amount;
            }
            return acc;
        }, 0);
        setTotalPrice(total);
    }, [selectedItems, orderItem]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log('selectedRows: ', selectedRows);
            let total = 0
            setSelectedItems(selectedRows)
            for (const item of selectedRows) {
                if (item.total) {
                    total += parseFloat(item.total) || 0;
                }
            }
            setTotalPrice(total)
        }
    };


    const handleRemoveItem = (product) => {
        dispatch(removeOrderProduct({ productId: product.key }))
    }

    const handlePlusItem = (product) => {
        dispatch(plusAmountOrderProduct({ productId: product.key }))
    }

    const handleMinusItem = (product) => {
        dispatch(minusAmountOrderProduct({ productId: product.key }))
    }

    const handleRemoveSelectedItems = () => {
        let itemIds = []
        if (selectedItems?.length > 0) {
            for (const item of selectedItems) {
                if (item.key) {
                    itemIds.push(item.key)
                }
            }
        }
        dispatch(removeSelectedProduct(itemIds))

    }

    const columns = [
        {
            title: `Tất cả (${orderItem.length} sản phẩm)`,
            dataIndex: 'product',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (amount, record) => (
                <div className='button-p-m' style={{ position: "relative", top: "6px" }}>
                    <div className='btn-plus' onClick={() => handlePlusItem(record)}>
                        <FaPlus className='icon' />
                    </div>
                    <div className='count'>
                        {amount}
                    </div>

                    <div className={amount > 1 ? "btn-minus" : "btn-minus disabled"} onClick={() => handleMinusItem(record)}>
                        <FaMinus className='icon' />
                    </div>
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (total) => (
                <p style={{ color: "red", fontWeight: "500" }}>{(total).toLocaleString('vi-VN')}₫</p>
            ),
        },
        {
            title: <DeleteOutlined onClick={() => handleRemoveSelectedItems()} />,
            key: 'action',
            render: (_, record) => (
                <DeleteOutlined onClick={() => handleRemoveItem(record)} />
            ),
        },
    ];

    const data = orderItem?.map((item) => ({
        key: item.productId,
        product: (
            <div className='product' style={{ display: "flex", alignItems: "center" }}>
                <div className='produuct-img'>
                    <img style={{ height: "100px", width: "90px", marginRight: "10px" }} src={item.image} />
                </div>
                <div className='product-name' style={{ width: "220px" }}>
                    {item.name}
                </div>
            </div>
        ),
        price: <p style={{ fontWeight: "500" }}>{item.price.toLocaleString('vi-VN')}₫</p>,
        amount: item.amount,
        total: item.price * item.amount,
    }));

    return (
        <div className='cart-page-container'>
            <div className='cart-title'>Giỏ hàng</div>
            <div className='cart-main-content'>
                <div className='cart-content-left'>
                    <div className='cart-content'>
                        <Table
                            pagination={false}
                            rowSelection={rowSelection}
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
                                        <BsCartX style={{ fontSize: "25px" }} /> Giỏ hàng trống
                                    </div>
                                )
                            }}
                        />
                    </div>
                </div>
                <div className='cart-content-right'>
                    <div className='content-top'>
                        <div className='text'>
                            <div className='title'>Tạm tính</div>
                            <div className='price'>
                                {totalPrice.toLocaleString('vi-VN')}₫
                            </div>
                        </div>
                        <div className='text'>
                            <div className='title'>Giảm giá</div>
                            <div className='price'>0</div>
                        </div>
                        <div className='text'>
                            <div className='title'>Thuế</div>
                            <div className='price'>0</div>
                        </div>
                        <div className='text'>
                            <div className='title'>Phí giao hàng</div>
                            <div className='price'>0</div>
                        </div>
                    </div>
                    <Divider />
                    <div className='content-bot'>
                        <div className='total-price'>
                            <div className='title'>Tổng tiền</div>
                            <div className='total'>
                                {totalPrice.toLocaleString('vi-VN')}₫
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CartPage;