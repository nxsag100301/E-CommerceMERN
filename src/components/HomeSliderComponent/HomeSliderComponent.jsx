import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeSliderComponent.scss';
import { Image } from 'antd';

const CustomArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                zIndex: 1,
                fontSize: "20px",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                lineHeight: "40px",
                textAlign: "center",
                color: "white",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
        </div>
    );
};

const HomeSliderComponent = (props) => {
    const { arrImages } = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        prevArrow: <CustomArrow />,
        nextArrow: <CustomArrow />,
    };

    return (
        <div className='home-slider-container'>
            <Slider {...settings}>
                {arrImages?.length > 0 &&
                    arrImages.map((item, index) => {
                        return (
                            <div className='slider-child' key={`homeslider${index}`}>
                                <Image
                                    src={item}
                                    alt='slider'
                                    preview={false}
                                    width="100%"
                                    height="250px"
                                    style={{ objectFit: 'cover', borderRadius: '5px' }}
                                />
                            </div>
                        );
                    })}
            </Slider>
        </div>
    );
};

export default HomeSliderComponent;
