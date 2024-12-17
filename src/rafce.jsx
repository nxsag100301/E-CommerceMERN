import React from 'react';

const ComponentName = () => {
    return (
        <div>
            {/* Your component content */}
        </div>
    );
};

export default ComponentName;


import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const menu = [
  {
    key: '1',
    label: (
      <span>Thông tin tài khoản</span>
    ),
  },
  {
    key: '2',
    label: (
      <span>Đơn hàng của tôi</span>
    ),
  },
  {
    key: '3',
    label: (
      <span>Trung tâm hỗ trợ</span>
    ),
  },
  {
    key: '4',
    label: (
      <span>Đăng xuất</span>
    ),
  },
];
const App = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;