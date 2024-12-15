import React from 'react';
import './HomeFooter.scss'
import { FaFacebook, FaGithub, FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdHome, IoIosMail, IoMdSearch } from "react-icons/io";

const HomeFooter = () => {
    return (
        <>
            <div className='home-footer-container'>
                <div className='footer-top'>
                    <div className='content-left'>
                        <div className='text1'>
                            About project
                        </div>
                        <div className='text2'>
                            Công nghệ: ReactJS, Redux, NodeJS(v20.14.0), MongoDB, RESTful API,
                            Ant design
                        </div>
                        <div className='text2'>
                            Website thương mại điện tử với đầy đủ các chức năng cơ bản:
                            Thêm, xóa, sửa sản phẩm, người dùng, thanh toán Paypal
                        </div>
                        <div className='social'>
                            <div className='icon' style={{ color: "#0067ff" }} onClick={() => window.open("https://www.facebook.com/nxsag/", "_blank")}>
                                <FaFacebook />
                            </div>
                            <div className='icon' onClick={() => window.open("https://github.com/nxsag100301", "_blank")}>
                                <FaGithub />
                            </div>
                            <div className='icon' onClick={() => window.open("https://www.google.com.vn/?hl=vi", "_blank")}>
                                <FcGoogle />
                            </div>
                        </div>
                    </div>
                    <div className='content-center'>
                        <div className='text1'>
                            Contact me
                        </div>
                        <div className='search-bar'>
                            <div className='icon-search'>
                                <IoMdSearch />
                            </div>
                            <div className='input-search'>
                                <input placeholder='Find me?' />
                            </div>
                            <div className='button-search'>
                                Tìm kiếm
                            </div>
                        </div>
                        <div className='contact-info'>
                            <div className='icon'>
                                <IoMdHome />
                            </div>
                            <div className='text'>
                                TP. HCM
                            </div>
                        </div>
                        <div className='contact-info'>
                            <div className='icon'>
                                <IoIosMail />
                            </div>
                            <div className='text'>
                                nguyenxuansang10032001@gmail.com
                            </div>
                        </div>
                        <div className='contact-info'>
                            <div className='icon'>
                                <FaPhoneAlt />
                            </div>
                            <div className='text'>
                                +84773482059
                            </div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='text1'>
                            Opening hours
                        </div>
                        <div className='footer-schedule'>
                            <div className='schedule'>
                                <div className='day'>
                                    Mon - Thu:
                                </div>
                                <div className='time'>
                                    8am - 9pm
                                </div>
                            </div>
                            <div className='schedule'>
                                <div className='day'>
                                    Fri - Sat:
                                </div>
                                <div className='time'>
                                    8am - 1am
                                </div>
                            </div>
                            <div className='schedule'>
                                <div className='day'>
                                    Sunday:
                                </div>
                                <div className='time'>
                                    9am - 10pm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className='footer-bot'>
                © {new Date().getFullYear()} Created by Nxsag
            </div>
        </>
    );
};

export default HomeFooter;
