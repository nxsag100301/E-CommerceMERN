import React from 'react';
import { Card } from 'antd';
import './CardComponent.scss'
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const CardComponent = (props) => {
    const navigate = useNavigate()
    const { listProduct } = props
    return (
        <div className='card-container'>
            {listProduct?.length > 0 &&
                listProduct.map((item, index) => {
                    return (
                        <Card className='card' key={`productindex${index}`}
                            onClick={() => navigate(`/detail-product/${item._id}`)}
                            styles={{ body: { padding: "10px", }, }}
                            hoverable
                            style={{ width: 200, minHeight: 350 }}
                            cover={
                                <img alt="example" style={{ objectFit: "cover" }}
                                    src={item.image} />}
                        >
                            <div className='card-title'>{item.name}</div>
                            <div className='rate-selled'>
                                <span className='card-rate'>{item.rating} <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                                <span className='card-selled'> | Đã bán {item.selled || 200}+</span>
                            </div>
                            <div className='price-discount'>
                                <span className='price'>{item.price.toLocaleString('vi-VN')} &#8363;</span>
                                <span className='discount'>
                                    -{item.discount || 10}%
                                </span>
                            </div>
                        </Card>
                    )
                })}
        </div>
    );
};

export default CardComponent;
