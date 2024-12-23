import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { putUpdateProduct } from '../../../utils/productApi';

const DetailProductModal = (props) => {
    const { productInfo, isShowDetail, setIsShowDetail, setActionSuccess } = props
    const { TextArea } = Input;
    const [productName, setProductName] = useState()
    const [productType, setProductType] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [fileList, setFileList] = useState([])
    const [hasChange, setHasChange] = useState(false)
    const [form] = Form.useForm()


    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    }

    useEffect(() => {
        if (productInfo) {
            setProductName(productInfo.name)
            setProductType(productInfo.type)
            setPrice(productInfo.price)
            setDescription(productInfo.description)
            setQuantity(productInfo.countInStock)
            setImage(productInfo.image)
            if (productInfo.image) {
                setFileList([
                    {
                        uid: '-1', // Một ID duy nhất cho file
                        name: 'image.png', // Tên file (tuỳ chỉnh)
                        status: 'done', // Trạng thái tải lên
                        url: productInfo.image, // URL của ảnh
                    },
                ]);
            } else {
                setFileList([]);
            }
        }
    }, [productInfo])

    useEffect(() => {
        if (productName !== productInfo?.name || productType !== productInfo?.type ||
            quantity !== productInfo?.countInStock || price !== productInfo?.price ||
            description !== productInfo?.description
        ) {
            setHasChange(true)
        }
        else (
            setHasChange(false)
        )

    }, [productName, productType, quantity, price, description])

    const handleUploadImage = (info) => {

        if (info.file) {
            const file = info.file
            if (file instanceof Blob) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Image = e.target.result;
                    setImage(base64Image); // Cập nhật state với ảnh mới nhất
                    setHasChange(true)
                };
                reader.readAsDataURL(file);

                // Xóa ảnh cũ, chỉ giữ ảnh mới nhất
                info.fileList = info.fileList.slice(-1);
            } else {
                console.error('File is not a valid Blob or File.');
            }
        }
        setFileList(info?.fileList);
    };

    const handleConfirmUpdate = async () => {
        if (!productName || !productType || !quantity || !image || !price || !description) {
            message.error("Vui lòng điền đủ thông tin!")
            return
        }
        let res = await putUpdateProduct({
            id: productInfo?._id,
            name: productName,
            image: image,
            type: productType,
            price: price,
            countInStock: quantity,
            description: description
        })
        if (res?.errCode === 0) {
            message.success("Cập nhật thành công!")
            setIsShowDetail(false)
            setHasChange(false)
            setActionSuccess(true)
        }
        else {
            message.error(res?.message)
        }

    }


    return (
        <div>
            <Modal title="Chi tiết sản phẩm" open={isShowDetail}
                maskClosable={false} width={700}
                onCancel={() => setIsShowDetail(false)}
                footer={[
                    <Button key="back" onClick={() => setIsShowDetail(false)}>
                        Thoát
                    </Button>,
                    <Button key="submit" type="primary" disabled={!hasChange}
                        onClick={() => handleConfirmUpdate()}>
                        Lưu thay đổi
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    layout="horizontal"
                    labelAlign="left"
                    style={{
                        maxWidth: "100%",
                    }}
                >
                    <Row gutter={[0, 20]}>
                        <Col span={16}>
                            <Form.Item label="Tên SP" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                                <Input value={productName} onChange={(event) => setProductName(event.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Loại SP" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                <Select value={productType} onChange={(value) => setProductType(value)}>
                                    <Select.Option value="tv">TV</Select.Option>
                                    <Select.Option value="tulanh">Tủ lạnh</Select.Option>
                                    <Select.Option value="laptop">Laptop</Select.Option>
                                    <Select.Option value="dienthoai">Điện thoại</Select.Option>
                                    <Select.Option value="quanao">Quần áo</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[0, 20]}>
                        <Col span={16}>
                            <Form.Item label="Giá" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                                <Input value={price} onChange={(event) => setPrice(event.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Tồn kho" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                <InputNumber
                                    style={{ width: "100%" }}
                                    value={quantity}
                                    onChange={(value) => setQuantity(value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[0, 20]}>
                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                labelCol={{ span: 2 }}
                                wrapperCol={{ span: 21 }}
                            >
                                <TextArea
                                    rows={5}
                                    style={{
                                        marginLeft: "18px",
                                    }}
                                    value={description} onChange={(event) => setDescription(event.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Form.Item
                                label="Hình ảnh"
                                valuePropName="fileList"
                                labelCol={{ span: 6 }}
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadImage}
                                    beforeUpload={() => false}
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                    >
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default DetailProductModal;


