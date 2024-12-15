import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import './ModalSignIn.scss'
import { toast } from 'react-toastify';

const ModalSignIn = (props) => {

    const [caseSignUpSignIn, setCaseSignUpSignIn] = useState('signin')
    const { isShowModal, setIsShowModal } = props
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        setIsShowModal(false)
        form.resetFields();
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onFinish = (values) => {
        const { email, password, confirmPassword } = values
        const emailIsValid = validateEmail(email)
        if (!emailIsValid) {
            toast.error("Email không hợp lệ!")
            return
        }
        if (caseSignUpSignIn === 'signin') {
            console.log('Sign In:', values);
        }
        else if (caseSignUpSignIn === 'signup') {
            if (password !== confirmPassword) {
                toast.error("Mật khẩu không khớp!")
                return
            }
            console.log('Sign Up:', values);
        }
    };

    return (
        <>
            {caseSignUpSignIn === 'signin' ?
                <Modal
                    footer={null}
                    width={"700px"}
                    open={isShowModal}
                    onCancel={() => handleCloseModal()}
                    maskClosable={false}>
                    <div className='sign-in-container'>
                        <div className='content-left'>
                            <div className='title'>
                                <span className='title-1'>Đăng nhập bằng email</span>
                                <span className='title-2'>Nhập email và mật khẩu tài khoản E-commerce</span>
                            </div>
                            <div className='form-sign-in'>
                                <Form
                                    form={form}
                                    name="sign-in"
                                    layout="vertical"
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        layout="vertical"
                                        style={{ marginBottom: "12px" }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        layout="vertical"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item label={null}>
                                        <Button type="primary" htmlType="submit">
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className='description-sign-in'>
                                <div className='forgot-password'>
                                    Quên mật khẩu?
                                </div>
                                <div className='register-account'>
                                    <span className='text-1'>
                                        Chưa có tài khoản?
                                    </span>
                                    <span className='text-2'
                                        onClick={() => setCaseSignUpSignIn('signup')}>
                                        Tạo tài khoản
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='content-right'>

                        </div>
                    </div>
                </Modal>
                :
                <Modal
                    footer={null}
                    width={"700px"}
                    open={isShowModal}
                    onCancel={() => handleCloseModal()}
                    maskClosable={false}>
                    <div className='sign-in-container'>
                        <div className='content-left'>
                            <div className='title'>
                                <span className='title-1'>Đăng ký tài khoản</span>
                                <span className='title-2'>Nhập email và mật khẩu để đăng ký</span>
                            </div>
                            <div className='form-sign-up'>
                                <Form
                                    form={form}
                                    name="sign-up"
                                    layout="vertical"
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        layout="vertical"
                                        style={{ marginBottom: "12px" }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        layout="vertical"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        label="Xác nhận mật khẩu"
                                        name="confirmPassword"
                                        layout="vertical"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item label={null}>
                                        <Button type="primary" htmlType="submit">
                                            Đăng ký
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className='description-sign-up'>
                                <div className='register-account'>
                                    <span className='text-1'>
                                        Đã có tài khoản?
                                    </span>
                                    <span className='text-2'
                                        onClick={() => setCaseSignUpSignIn('signin')}>
                                        Đăng nhập
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='content-right'>

                        </div>
                    </div>
                </Modal>
            }

        </>
    );
};

export default ModalSignIn;

