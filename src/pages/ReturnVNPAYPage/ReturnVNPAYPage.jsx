import { useEffect, useState } from 'react';
import './ReturnVNPAYPage.scss';
import { postCreateOrder, vnPayReturn } from '../../utils/orderApi';
import { message } from 'antd';
import { orderSuccess } from '../../redux/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const VnpayReturn = () => {
    const [responseCode, setResponseCode] = useState(null);
    const [orderId, setOrderId] = useState()
    const shipPrice = useSelector((state) => state.order.shippingPrice)
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

    useEffect(() => {
        const fetchVnpayReturn = async () => {
            try {
                const url = new URL(window.location.href);

                const vnp_Params = {};
                url.searchParams.forEach((value, key) => {
                    vnp_Params[key] = value;
                });
                console.log("vnp_Params:", vnp_Params)
                const response = await vnPayReturn(vnp_Params);
                setResponseCode(response.code);
            } catch (error) {
                console.error('Error fetching VNPay return data:', error);
            }
        };

        fetchVnpayReturn();
    }, []);

    useEffect(() => {
        if (orderItemsSelected && userInfo && defaultPrice && totalPrice && responseCode === '00') {
            createOrder()
        }
    }, [responseCode])

    const createOrder = async () => {
        const options = { timeZone: 'Asia/Ho_Chi_Minh', timeStyle: 'short', dateStyle: 'short' };
        const currentTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
        const res = await postCreateOrder({
            orderItems: orderItemsSelected,
            paymentMethod: "vnpay",
            itemsPrice: defaultPrice,
            shippingPrice: shipPrice,
            totalPrice: totalPrice + shipPrice,
            isPaid: true,
            paidAt: currentTime,
            fullName: userInfo.name,
            address: userInfo.address,
            phone: userInfo.phone,
            user: userId
        })
        if (res?.errCode === 0) {
            message.success("Đặt hàng thành công!")
            dispatch(orderSuccess())
            setOrderId(res?.order?._id)
        }
        else {
            message.error(res?.message)
        }
    }

    if (responseCode === null) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className="vnpay-return-container">
            <h1>Thông báo kết quả thanh toán</h1>
            {responseCode === '00' ? (
                <div className="success-message">
                    <h2>Giao dịch thành công!</h2>
                    <p>Mã giao dịch của bạn đã được xác nhận.</p>
                    <a onClick={() => navigate(`/detail-order/${orderId}`)}>Xem chi tiết đơn hàng</a>
                </div>
            ) : (
                <div className="error-message">
                    <h2>Giao dịch thất bại!</h2>
                    <p>Mã lỗi: {responseCode}</p>
                </div>
            )}
        </div>
    );
};

export default VnpayReturn;
