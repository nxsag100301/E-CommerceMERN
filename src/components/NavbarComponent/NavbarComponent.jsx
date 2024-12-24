import React from 'react';
import './NavbarComponent.scss'
import { Checkbox, Rate } from 'antd';
import TypeProduct from '../TypeProduct/TypeProduct';


const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const NavbarComponent = () => {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return (
                    <div className='navbar-case-text'>
                        <div className='navbar-title'>
                            Danh mục
                        </div>
                        {options?.length > 0 && options.map((item, index) => {
                            return (
                                <div key={`navbaroption${index}`} className='navbar-options'>
                                    <TypeProduct name={item.label} key={item.value} value={item.value} />
                                </div>
                            )
                        })}
                    </div>
                )

            case 'company':
                return (
                    <div className='navbar-case-company'>
                        <div className='navbar-title'>
                            Thương hiệu
                        </div>
                        <Checkbox.Group
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '3px',
                            }}
                            onChange={onChange}>
                            {options?.length > 0 && options.map((item, index) => {
                                return (
                                    <Checkbox key={`navbarcheckbox${index}`} value={item.value}>{item.label}</Checkbox>
                                )
                            })}
                        </Checkbox.Group>
                    </div>
                )

            case 'rate':
                return (
                    <div className='navbar-case-rate'>
                        <div className='navbar-title'>
                            Đánh giá
                        </div>
                        <div className='navbar-rate'>
                            {options?.length > 0 && options.reverse().map((item, index) => {
                                return (
                                    <div key={`navbarrate${index}`} className='rate-child'>
                                        <Rate className='rate' disabled defaultValue={item} />
                                        <div className='rate-description'>từ {item} sao</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )

            default:
                return (
                    <div>default</div>
                )
        }
    }
    return (
        <div className='navbar-container'>
            {renderContent('text', [
                { label: 'TV', value: "tv" },
                { label: 'Tủ lạnh', value: "tulanh" },
                { label: 'Laptop', value: "laptop" },
                { label: 'Điện thoại', value: "dienthoai" },
                { label: 'Quần áo', value: "quanao" }
            ]
            )}
            {renderContent('company', [
                { value: 'apple', label: 'Apple' },
                { value: 'samsung', label: 'Samsung' },
                { value: 'xiaomi', label: 'Xiaomi' },
                { value: 'oppo', label: 'Oppo' },
            ])}
            {renderContent('rate', [3, 4, 5])}
        </div>
    );
};

export default NavbarComponent;
