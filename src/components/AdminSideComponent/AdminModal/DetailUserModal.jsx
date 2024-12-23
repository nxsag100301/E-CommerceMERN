import React, { useEffect, useState } from 'react';
import { Button, Col, message, Modal, Row } from 'antd';
import {
    Form,
    Input,
    Select,
} from 'antd';
import { postUpdateUser } from '../../../utils/userApi';

const DetailUserModal = (props) => {
    const { isShowDetail, setIsShowDetail, setActionSuccess, userInfor } = props
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [hasChange, setHasChange] = useState(false)

    const [form] = Form.useForm();

    useEffect(() => {
        if (userInfor) {
            setName(userInfor?.name)
            setIsAdmin(userInfor?.isAdmin)
            setEmail(userInfor?.email)
            setPassword("qwertyuiop")
            setPhone(userInfor?.phone)
            setAddress(userInfor?.address)
        }

    }, [userInfor])

    useEffect(() => {
        if (name !== userInfor?.name || isAdmin !== userInfor?.isAdmin ||
            address !== userInfor.address || phone !== userInfor.phone) {
            setHasChange(true)
        }
        else {
            setHasChange(false)
        }

    }, [name, address, isAdmin, phone])

    const handleConfirmUpdate = async () => {
        const res = await postUpdateUser({
            id: userInfor?._id,
            name, address, isAdmin, phone
        })
        console.log('check res:', res)
        if (res?.errCode === 0) {
            message.success("Cập nhật người dùng thành công!")
            setIsShowDetail(false)
            setActionSuccess(true)
        }
        else {
            message.error(res?.message)
        }

    }

    return (
        <div>
            <Modal title="Chi tiết người dùng" open={isShowDetail}
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
                                value={email} readOnly />
                        </Form.Item>
                        <Row gutter={[0, 20]}>
                            <Col span={16}>
                                <Form.Item label="Mật khẩu" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                                    <Input.Password value={password} disabled />
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

export default DetailUserModal;


