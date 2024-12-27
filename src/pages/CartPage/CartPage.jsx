import React, { useEffect, useState } from 'react';
import { Button, message, Table } from 'antd';
import './CartPage.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BsCartX } from "react-icons/bs";
import {
    minusAmountOrderProduct,
    plusAmountOrderProduct,
    removeOrderProduct,
    removeSelectedItemsRedux,
    removeSelectedProduct,
    selectedItemsRedux,
    updatePrice
} from '../../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import TotalPriceComponent from '../../components/TotalPriceComponent/TotalPriceComponent';

const CartPage = () => {
    const orderItem = useSelector((state) => state.order.orderItems);
    // const orderItemsSelected = useSelector((state) => state.order.orderItemsSelected)
    const userInfo = useSelector((state) => state.user);
    const [defaultPrice, setDefaultPrice] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [totalDiscount, setTotalDiscount] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log('selectedRows: ', selectedRows);
            setSelectedItems(selectedRows)
        }
    }

    useEffect(() => {
        dispatch(updatePrice({
            price: defaultPrice,
            discount: totalDiscount,
            total: defaultPrice - totalDiscount
        }))
    }, [defaultPrice, totalDiscount])

    useEffect(() => {
        if (selectedItems.length > 0) {
            let totalDiscountPrice = 0
            let defaultP = 0
            selectedItems.map((item) => {
                const discountPrice = item.price * item.amount * (item.discount / 100);
                const price = item.price * item.amount
                defaultP += price
                totalDiscountPrice += discountPrice;
                return (item.price * item.amount) - discountPrice;
            })
            setTotalDiscount(totalDiscountPrice)
            setDefaultPrice(defaultP)
        } else {
            setDefaultPrice(0)
            setTotalDiscount(0)
            dispatch(removeSelectedItemsRedux())
        }
        let arrSelected = []
        for (const item of selectedItems) {
            arrSelected.push({
                name: item.product.name,
                amount: item.amount,
                image: item.product.image,
                price: item.price,
                total: item.total,
                product: item.key,
                discount: item.discount
            })
        }
        dispatch(selectedItemsRedux(arrSelected))
    }, [selectedItems]);

    const handleRemoveItem = (product) => {
        dispatch(removeOrderProduct({ productId: product.key }))
    }

    const handlePlusItem = (product) => {
        dispatch(plusAmountOrderProduct({ productId: product.key }));
        setSelectedItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.key === product.key) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
        });
    };

    const handleMinusItem = (product) => {
        dispatch(minusAmountOrderProduct({ productId: product.key }));

        setSelectedItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.key === product.key) {
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            });
        });
    };


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

    const handleBuyNow = () => {
        if (selectedItems.length === 0) {
            message.error("Vui lòng chọn ít nhất 1 sản phẩm!")
            return
        }
        if (!userInfo?.phone || !userInfo?.address || !userInfo?.name) {
            message.error("Vui lòng cập nhật tên, địa chỉ và số điện thoại!")
            navigate('/profile-user', { state: { from: '/cart' } })
            return
        }
        navigate('/payment')
    }

    const columns = [
        {
            title: `Tất cả (${orderItem.length} sản phẩm)`,
            dataIndex: 'product',
            render: (product) => (
                <div className='product' style={{ display: "flex", alignItems: "center" }}>
                    <div className='produuct-img'>
                        <img
                            style={{ height: "100px", width: "90px", marginRight: "10px" }}
                            src={product.image}
                            alt={product.name} // Đừng quên alt để SEO tốt hơn
                        />
                    </div>
                    <div className='product-name' style={{ width: "180px" }}>
                        {product.name}
                    </div>
                </div>
            ),
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            render: (discount) => (
                <p style={{ color: "red" }}>-{discount}%</p>
            )
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (price) => (
                <p style={{ fontWeight: "500" }}>{price.toLocaleString('vi-VN')}₫</p>
            )
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
                <p style={{ color: "red", fontWeight: "500" }}>
                    {total.toLocaleString('vi-VN')}₫
                </p>
            )
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
        product: {
            name: item.name,
            image: item.image,
        },
        discount: item.discount,
        price: item.price,
        amount: item.amount,
        total: (item.price * item.amount) - (item.price * item.amount * (item.discount > 0 ? (item.discount / 100) : 0))
    }))

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
                    <div className='sticky'>
                        <TotalPriceComponent />
                        <div className='buy-now-button'>
                            <Button size='large' onClick={() => handleBuyNow()}
                                style={{
                                    width: "100%",
                                    backgroundColor: "#0b74e5", borderColor: "#0b74e5",
                                    color: "white"
                                }}>Mua ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CartPage;