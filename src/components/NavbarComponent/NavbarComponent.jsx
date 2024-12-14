import React from 'react';
import './NavbarComponent.scss'
import { Checkbox, Rate } from 'antd';


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
                                    <span>
                                        {item}
                                    </span>
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
                                    <div className='rate-child'>
                                        <Rate className='rate' key={`navbarrate${index}`} disabled defaultValue={item} />
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
            {renderContent('text', ['TV', 'Tủ lạnh', 'Laptop', 'Điện thoại', 'Quần áo'])}
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
