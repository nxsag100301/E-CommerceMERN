import React, { useEffect, useState } from 'react';
import './DetailOrder.scss';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Table } from 'antd';
import { getDetailOrder } from '../../utils/orderApi';

const DetailOrder = () => {
    const [detailOrder, setDetailOrder] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchDetailOrder();
    }, []);

    const fetchDetailOrder = async () => {
        const res = await getDetailOrder(id);
        if (res?.errCode === 0) {
            setDetailOrder(res.order);
        } else {
            console.log(res?.message);
        }
    };

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (image) => (
                <img src={image} alt="product" style={{ width: '100px', height: '100px' }} />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price) => <span style={{ color: "red" }}>{price.toLocaleString('vi-VN')}₫</span>,
        },
    ];

    const data = detailOrder?.orderItems?.map((item, index) => ({
        key: index,
        image: item.image,
        name: item.name,
        amount: item.amount,
        price: item.price,
    }));

    return (
        <div className="detail-order-container" style={{
            padding: "10px 100px",
            backgroundColor: "#f5f5fa",
            paddingTop: "20px",
        }}>
            <Card title="Chi tiết đơn hàng" style={{ width: '100%', margin: '0 auto', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Mã đơn hàng">{detailOrder?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        <span style={{ color: "red" }}>{detailOrder?.totalPrice?.toLocaleString('vi-VN')}₫</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thanh toán">
                        {detailOrder?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Đã giao">
                        {detailOrder?.isDelivered ? 'Đã giao' : 'Chưa giao'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {new Date(detailOrder?.createdAt).toLocaleDateString('vi-VN')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phương thức thanh toán">
                        {
                            detailOrder?.paymentMethod === 'tienmat' ? 'Tiền mặt' :
                                detailOrder?.paymentMethod === "paypal" ? 'Paypal' :
                                    detailOrder?.paymentMethod === "vnpay" ? "VNPAY" :
                                        "Momo"
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ giao hàng">
                        {`${detailOrder?.shippingAddress?.fullName}, ${detailOrder?.shippingAddress?.address}, ${detailOrder?.shippingAddress?.phone}`}
                    </Descriptions.Item>
                </Descriptions>

                <div className="order-items">
                    <h3>Danh sách sản phẩm</h3>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        rowKey="key"
                        bordered
                    />
                </div>
            </Card>
        </div>
    );
};

export default DetailOrder;
