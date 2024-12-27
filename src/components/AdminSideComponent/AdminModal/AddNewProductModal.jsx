import React, { useState } from 'react';
import { Col, message, Modal, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Upload
} from 'antd';
import { postCreateProduct } from '../../../utils/productApi';

const AddNewProductModal = (props) => {
    const { isShowAddnew, setIsShowAddnew, setActionSuccess } = props
    const { TextArea } = Input;
    const [productName, setProductName] = useState()
    const [productType, setProductType] = useState()
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [fileList, setFileList] = useState([])
    const [form] = Form.useForm();

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleConfirmAddNew = async () => {
        if (!productName || !productType || !quantity || !image || !price || !description) {
            message.error("Vui lòng điền đủ thông tin!")
            return
        }
        let res = await postCreateProduct({
            name: productName,
            image: image,
            type: productType,
            price: price,
            countInStock: quantity,
            description: description,
            discount: discount
        })
        if (res?.errCode === 0) {
            message.success("Thêm sản phẩm thành công")
            setIsShowAddnew(false)
            setActionSuccess(true)
            setProductName('')
            setProductType('')
            setPrice('')
            setQuantity(0)
            setDescription('')
            setDiscount(0)
            setImage(null)
            setFileList([])
            form.resetFields()
        }
        else {
            message.error(res?.message)
        }
    }

    const handleUploadImage = (info) => {

        if (info.file) {
            const file = info.file

            // Kiểm tra xem file có tồn tại và đúng kiểu hay không
            if (file instanceof Blob) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Image = e.target.result;
                    setImage(base64Image); // Cập nhật state với ảnh mới nhất
                };
                reader.readAsDataURL(file);

                // Xóa ảnh cũ, chỉ giữ ảnh mới nhất
                info.fileList = info.fileList.slice(-1);
            } else {
                console.error('File is not a valid Blob or File.');
            }
        }
        setFileList(info?.fileList);
    }


    const handleCloseModal = () => {
        setIsShowAddnew(false)
        setProductName('')
        setProductType('')
        setPrice('')
        setQuantity(0)
        setDescription('')
        setImage(null)
        setFileList([])
        form.resetFields();
    }

    return (
        <div>
            <Modal title="Thêm sản phẩm" open={isShowAddnew}
                maskClosable={false} width={700}
                onOk={() => handleConfirmAddNew()}
                onCancel={() => handleCloseModal()}
            >
                <div style={{ margin: '20px 0' }}>
                    <Form
                        form={form}
                        layout="horizontal"
                        labelAlign="left"
                        style={{
                            maxWidth: "100%",
                        }}
                    >
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <Form.Item label="Tên SP" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                                    <Input style={{ position: "relative", left: "-8px" }}
                                        value={productName} onChange={(event) => setProductName(event.target.value)} />
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
                                <Form.Item label="Số lượng" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <InputNumber
                                        style={{ width: "135px" }}
                                        value={quantity}
                                        onChange={(value) => setQuantity(value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={16}>
                                <Form.Item label="Loại SP" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                                    <Select
                                        value={productType} onChange={(value) => setProductType(value)}>
                                        <Select.Option value="tv">TV</Select.Option>
                                        <Select.Option value="tulanh">Tủ lạnh</Select.Option>
                                        <Select.Option value="laptop">Laptop</Select.Option>
                                        <Select.Option value="dienthoai">Điện thoại</Select.Option>
                                        <Select.Option value="quanao">Quần áo</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Giảm giá" labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
                                    <InputNumber style={{ position: "relative", left: "-8px", width: "135px" }}
                                        value={discount} onChange={(value) => setDiscount(value)} />
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
                                    <Upload fileList={fileList}
                                        listType="picture-card"
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

                </div>
            </Modal>
        </div>
    );
};

export default AddNewProductModal;


