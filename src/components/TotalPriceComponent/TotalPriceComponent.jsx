import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import './TotalPriceComponent.scss'
import { useSelector } from 'react-redux';

const TotalPriceComponent = () => {
    const defaultPrice = useSelector((state) => state.order.itemsPrice)
    const totalDiscount = useSelector((state) => state.order.totalDiscount)
    const totalPrice = useSelector((state) => state.order.totalPrice)
    const shipPrice = useSelector((state) => state.order.shippingPrice)
    const userInfo = useSelector((state) => state.user);
    const [address, setAddress] = useState()

    useEffect(() => {
        if (userInfo?.address) {
            setAddress(userInfo.address)
        }
    }, [userInfo])
    return (
        <div className='cal-price'>
            <div className='content-top'>
                <div className='address'>
                    Địa chỉ: {address}
                    <span >
                        Thay đổi
                    </span>
                </div>
                <Divider />
                <div className='text'>
                    <div className='title'>Tạm tính</div>
                    <div className='price'>
                        {defaultPrice.toLocaleString('vi-VN')}₫
                    </div>
                </div>
                <div className='text'>
                    <div className='title'>Giảm giá</div>
                    <div className='price'>-{totalDiscount.toLocaleString('vi-VN')}₫</div>
                </div>
                <div className='text'>
                    <div className='title'>Phí giao hàng</div>
                    <div className='price'>{shipPrice.toLocaleString('vi-VN')}₫</div>
                </div>
            </div>
            <Divider />
            <div className='content-bot'>
                <div className='total-price'>
                    <div className='title'>Tổng tiền</div>
                    <div className='total'>
                        {totalPrice ? (totalPrice + shipPrice).toLocaleString('vi-VN') : 0}₫
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalPriceComponent;








