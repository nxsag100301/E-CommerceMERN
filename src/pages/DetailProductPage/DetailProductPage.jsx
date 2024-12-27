import React, { useEffect, useState } from 'react';
import './DetailProductPage.scss'
import logoFreeShip from '../../assets/image/logo-free-ship.png'
import logoDoiTra from '../../assets/image/logo-30-doitra.png'
import logoOfficial from '../../assets/image/logo-official.png'
import logoVoucher from '../../assets/image/giasoc.png'
import voucher from '../../assets/image/voucher.png'
import { Button, message, Rate } from 'antd';
import { FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { detailProduct } from '../../utils/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/userSlice';
import { addOrderProduct } from '../../redux/slices/orderSlice';


const DetailProductPage = () => {
    const { id } = useParams()
    const [productQuantity, setProductQuantily] = useState(1)
    const [product, setProduct] = useState()

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchDetailProduct()
    }, [id])

    const fetchDetailProduct = async () => {
        const res = await detailProduct(id)
        if (res?.errCode === 0) {
            setProduct(res.product)
        }
        else {
            console.log('Error:', res?.message)
        }
    }

    const handleAddToCart = () => {
        if (user?.isLoggedIn === false) {
            message.info("Vui lòng đăng nhập!")
            dispatch(openModal())
        }
        else {
            const data =
            {
                orderItem: {
                    productId: product?._id,
                    name: product?.name,
                    amount: productQuantity,
                    image: product?.image,
                    price: product?.price,
                    discount: product?.discount
                }
            }
            dispatch(addOrderProduct(data))
        }
    }

    const handleBuyNow = () => {
        if (user?.isLoggedIn === false) {
            message.info("Vui lòng đăng nhập!")
            dispatch(openModal())
        }
        else {
            console.log("Buy now")
        }
    }

    return (
        <div className='detail-product-container'>
            <div className='detail-content-top'>
                <div className='detail-product-image' >
                    <div className='product-image' style={{ backgroundImage: `url(${product?.image})` }}>

                    </div>
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
                        {product?.name}
                    </div>
                    <div className='detail-product-rate'>
                        {Number.isInteger(product?.rating) ? `${product?.rating}.0` : product?.rating?.toString()}
                        <Rate className='icon' disabled value={product?.rating} />
                        <div className='border'>

                        </div>
                        <div className='selled'>
                            Đã bán 999+
                        </div>
                    </div>
                    <div className='detail-product-price'>
                        {(product?.price * productQuantity).toLocaleString('vi-VN')}₫
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
                                <FaCartPlus className='icon' onClick={() => handleAddToCart()} />
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
                            <Button size='large' onClick={() => handleBuyNow()}
                                style={{
                                    width: "300px",
                                    backgroundColor: "#0b74e5", borderColor: "#0b74e5",
                                    color: "white"
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
