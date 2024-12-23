import React, { useState } from 'react';
import { Col, message, Modal, Row } from 'antd';
import {
    Form,
    Input,
    Select,
} from 'antd';
import { postCreateUser } from '../../../utils/userApi';

const AddNewUserModal = (props) => {
    const { isShowAddnewUser, setIsShowAddnewUser, setActionSuccess } = props
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()

    const [form] = Form.useForm();


    const handleCloseModal = () => {
        setIsShowAddnewUser(false)
        setName('')
        setEmail('')
        setIsAdmin(false)
        setPassword('')
        setPhone('')
        setAddress('')
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleConfirmAddNew = async () => {
        if (!name || !email || !password || !phone || !address) {
            message.error("Vui lòng nhập đủ thông tin!")
            return
        }
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            message.error("Email không hợp lệ!")
            return
        }
        const res = await postCreateUser({
            name, email, password, isAdmin, phone, address
        })
        if (res?.errCode === 0) {
            message.success("Thêm người dùng thành công!")
            setIsShowAddnewUser(false)
            setName('')
            setEmail('')
            setIsAdmin(false)
            setPassword('')
            setPhone('')
            setAddress('')
            setActionSuccess(true)
        }
        else {
            message.error(res?.message)
        }
    }

    return (
        <div>
            <Modal title="Thêm người dùng" open={isShowAddnewUser}
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
                            <Col span={16}>
                                <Form.Item label="Tên" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                                    <Input value={name} onChange={(event) => setName(event.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Quyền" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                    <Select value={isAdmin} onChange={(value) => setIsAdmin(value)}>
                                        <Select.Option value={true}>Quản trị viên</Select.Option>
                                        <Select.Option value={false}>Người dùng</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Email" labelCol={{ span: 2 }} wrapperCol={{ span: 21 }} >
                            <Input style={{ marginLeft: "18px", width: "580px" }}
                                value={email} onChange={(event) => setEmail(event.target.value)} />
                        </Form.Item>
                        <Row gutter={[0, 20]}>
                            <Col span={16}>
                                <Form.Item label="Mật khẩu" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                                    <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="SDT" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                                    <Input
                                        style={{ width: "100%" }} value={phone} onChange={(event) => setPhone(event.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Địa chỉ" labelCol={{ span: 2 }} wrapperCol={{ span: 21 }} >
                            <Input style={{ marginLeft: "18px", width: "580px" }}
                                value={address} onChange={(event) => setAddress(event.target.value)} />
                        </Form.Item>
                    </Form>

                </div>
            </Modal>
        </div>
    );
};

export default AddNewUserModal;


