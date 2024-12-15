import React, { useState } from 'react';
import './DetailProductPage.scss'
import logoFreeShip from '../../assets/image/logo-free-ship.png'
import logoDoiTra from '../../assets/image/logo-30-doitra.png'
import logoOfficial from '../../assets/image/logo-official.png'
import logoVoucher from '../../assets/image/giasoc.png'
import voucher from '../../assets/image/voucher.png'
import { Button, Rate } from 'antd';
import { FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";


const DetailProductPage = () => {
    const [productQuantity, setProductQuantily] = useState(1)
    return (
        <div className='detail-product-container'>
            <div className='detail-content-top'>
                <div className='detail-product-image'>

                </div>
                <div className='detail-product-info'>
                    <div className='detail-product-logo'>
                        <img alt='logo' src={logoFreeShip}></img>
                        <img alt='logo' src={logoDoiTra}></img>
                        <img alt='logo' src={logoOfficial}></img>
                        <span className='company-1'>Thương hiệu:</span>
                        <span className='company-2'>Apple</span>
                    </div>
                    <div className='detail-product-title'>
                        Apple iPhone 16 Pro Max
                    </div>
                    <div className='detail-product-rate'>
                        5.0 <Rate className='icon' disabled defaultValue={5} />
                        <div className='border'>

                        </div>
                        <div className='selled'>
                            Đã bán 999
                        </div>
                    </div>
                    <div className='detail-product-price'>
                        33.490.000₫
                    </div>
                    <div className='product-quantity'>
                        <div className='title'>
                            Số lượng
                        </div>
                        <div className='button-p-m'>
                            <div className='btn-plus'
                                onClick={() => setProductQuantily(productQuantity + 1)}>
                                <FaPlus className='icon' />
                            </div>
                            <div className='count'>
                                {productQuantity}
                            </div>
                            <div className={`btn-minus ${productQuantity === 1 ? 'disabled' : ''}`}
                                onClick={() => productQuantity > 1 && setProductQuantily(productQuantity - 1)}>
                                <FaMinus className='icon' />
                            </div>
                            <div className='border'></div>
                            <div className='add-to-cart'>
                                <FaCartPlus className='icon' />
                            </div>
                        </div>
                    </div>
                    <div className='detail-product-voucher'>
                        <div className='voucher-logo'>
                            <img alt='logo' src={logoVoucher} />
                        </div>
                        <div className='voucher-description'>
                            <div className='voucher-title'>
                                Giá sau áp dụng mã khuyến mãi
                            </div>
                            <div className='voucher-detail'>
                                <div className='icon'>
                                    <img alt='logo' src={voucher} />
                                </div>
                                <div className='discount'>
                                    Giảm 20.000₫
                                </div>
                                <div className='dis-from'>
                                    từ mã khuyến mãi của nhà bán
                                </div>
                            </div>
                            <div className='voucher-detail'>
                                <div className='icon'>
                                    <img alt='logo' src={voucher} />
                                </div>
                                <div className='discount'>
                                    Giảm 14.340₫
                                </div>
                                <div className='dis-from'>
                                    từ mã khuyến mãi của E-Commerce
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='buy-product-button'>
                        <div className='buy-now-button'>
                            <Button size='large' style={{
                                width: "300px",
                                backgroundColor: "#0b74e5", borderColor: "#0b74e5",
                                color: "white",
                            }}>Mua ngay</Button>
                        </div>
                        <div className='buy-now-button'>
                            <Button size='large' style={{
                                width: "300px",
                                backgroundColor: "#4caf50", borderColor: "#4caf50",
                                color: "white",
                            }}>Mua trả góp</Button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='detail-content-center'>

            </div>
            <div className='detail-content-bot'>

            </div>
        </div>
    );
};

export default DetailProductPage;
