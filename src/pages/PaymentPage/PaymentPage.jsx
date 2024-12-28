import React, { useState } from 'react';
import { Button, message, Table } from 'antd';
import './PaymentPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { postCreateOrder } from '../../utils/orderApi';
import { jwtDecode } from "jwt-decode";
import TotalPriceComponent from '../../components/TotalPriceComponent/TotalPriceComponent';
import { Radio, Space } from 'antd';
import tienmat from '../../assets/image/tienmat.png'
import momo from '../../assets/image/momo.jpg'
import paypal from '../../assets/image/paypal.png'
import { orderSuccess, updateShipPrice } from '../../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("tienmat")
    const shipPrice = useSelector((state) => state.order.shippingPrice)
    const [shipValue, setShipvalue] = useState(shipPrice)
    const defaultPrice = useSelector((state) => state.order.itemsPrice)
    const totalPrice = useSelector((state) => state.order.totalPrice)
    const orderItemsSelected = useSelector((state) => state.order.orderItemsSelected)
    const userInfo = useSelector((state) => state.user);
    const access_token = localStorage.getItem('access_token')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let userId = ''
    if (access_token) {
        const decoded = jwtDecode(access_token);
        if (!decoded) {
            userId = ''
        }
        else {
            userId = decoded?.payload?.id
        }
    }
    else {
        userId = ''
    }

    const handleOrder = async () => {
        if (orderItemsSelected && userInfo && defaultPrice && totalPrice) {
            const res = await postCreateOrder({
                orderItems: orderItemsSelected,
                paymentMethod: paymentMethod,
                itemsPrice: defaultPrice,
                shippingPrice: shipValue,
                totalPrice: totalPrice + shipValue,
                fullName: userInfo.name,
                address: userInfo.address,
                phone: userInfo.phone,
                user: userId
            })
            if (res?.errCode === 0) {
                message.success("Đặt hàng thành công!")
                dispatch(orderSuccess())
                navigate('/manage-order')
            }
            else {
                message.error(res?.message)
            }
        }
    }
    const onChangeShip = (e) => {
        setShipvalue(e.target.value);
        dispatch(updateShipPrice(e.target.value))
    };

    const onChangePay = (e) => {
        setPaymentMethod(e.target.value);
    };

    const columns = [
        {
            title: `Tất cả (${orderItemsSelected.length} sản phẩm)`,
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
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (total) => (
                <p style={{ color: "red", fontWeight: "500" }}>
                    {total.toLocaleString('vi-VN')}₫
                </p>
            )
        }
    ];

    const data = orderItemsSelected?.map((item) => ({
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
            <div className='cart-main-content'>
                <div className='cart-content-left1'>
                    <div className='cart-content-top'>
                        <div className='title'>
                            Chọn hình thức giao hàng
                        </div>
                        <div className='ship-method'>
                            <Radio.Group onChange={onChangeShip} value={shipValue}>
                                <Space>
                                    <div
                                        className={`delivery-container ${shipValue === 10000 ? 'active' : ''}`}
                                        onClick={() => onChangeShip({ target: { value: 10000 } })}
                                    >
                                        <Radio value={10000}>Giao tiết kiệm</Radio>
                                    </div>
                                    <div
                                        className={`delivery-container ${shipValue === 20000 ? 'active' : ''}`}
                                        onClick={() => onChangeShip({ target: { value: 20000 } })}
                                    >
                                        <Radio value={20000}>Giao tiêu chuẩn</Radio>
                                    </div>
                                    <div
                                        className={`delivery-container ${shipValue === 30000 ? 'active' : ''}`}
                                        onClick={() => onChangeShip({ target: { value: 30000 } })}
                                    >
                                        <Radio value={30000}>Giao nhanh</Radio>
                                    </div>
                                </Space>
                            </Radio.Group>
                        </div>
                        <div className='product-table'>
                            <Table
                                pagination={false}
                                columns={columns}
                                dataSource={data}
                            />
                        </div>
                    </div>
                    <div className='cart-content-bot'>
                        <div className='title'>
                            Chọn hình thức thanh toán
                        </div>
                        <div className='payment-method'>
                            <Radio.Group onChange={onChangePay} value={paymentMethod}>
                                <Space direction="vertical">
                                    <Radio value={"tienmat"} >
                                        <div className="custom-radio">
                                            <img alt="tienmat" src={tienmat} style={{ height: "32px", width: "32px" }} />
                                            Thanh toán khi nhận hàng
                                        </div>
                                    </Radio>
                                    <Radio value={"momo"}>
                                        <div className="custom-radio">
                                            <img alt="momo" src={momo} style={{ height: "32px", width: "32px" }} />
                                            Ví Momo
                                        </div>
                                    </Radio>
                                    <Radio value={"paypal"}>
                                        <div className="custom-radio">
                                            <img alt="paypal" src={paypal} style={{ height: "32px", width: "32px" }} />
                                            Paypal
                                        </div>
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
                <div className='cart-content-right'>
                    <div className='sticky'>
                        <TotalPriceComponent />
                        <div className='buy-now-button'>
                            <Button size='large' onClick={() => handleOrder()}
                                style={{
                                    width: "100%",
                                    backgroundColor: "#0b74e5", borderColor: "#0b74e5",
                                    color: "white"
                                }}>Đặt hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PaymentPage;