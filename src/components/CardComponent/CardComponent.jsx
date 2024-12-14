import React from 'react';
import { Card } from 'antd';
import './CardComponent.scss'
import { StarOutlined } from '@ant-design/icons';

const CardComponent = () => {
    return (
        <div className='card-container'>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://salt.tikicdn.com/cache/750x750/ts/product/08/9b/82/596cbffa77acc3b8b8aa9f06e7b63c88.jpg.webp" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
            <Card className='card'
                bodyStyle={{ padding: "10px" }}
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className='card-title'>Iphone</div>
                <div className='rate-selled'>
                    <span className='card-rate'>4,9 <StarOutlined style={{ fontSize: "14px", color: 'yellow' }} /></span>&nbsp;
                    <span className='card-selled'> | Đã bán 200+</span>
                </div>
                <div className='price-discount'>
                    <span className='price'>3.000.000 &#8363;</span>
                    <span className='discount'>
                        -10%
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default CardComponent;
