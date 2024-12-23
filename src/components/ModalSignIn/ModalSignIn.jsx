import React, { useState } from 'react';
import { Modal, Button, Form, Input, message, Spin } from 'antd';
import './ModalSignIn.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userInfo } from '../../redux/slices/userSlice.js';
import { userLoginServiceRedux1 } from '../../redux/action/userAction.js';
import { userSignUpService } from '../../utils/userApi.js';



const ModalSignIn = (props) => {

    const [caseSignUpSignIn, setCaseSignUpSignIn] = useState('signin')
    const [loading, setLoading] = useState(false);
    const { isShowModal, setIsShowModal } = props
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()


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

    const onFinish = async (values) => {
        const { email, password, confirmPassword } = values
        const emailIsValid = validateEmail(email)
        setLoading(true)
        if (!emailIsValid) {
            message.error("Email không hợp lệ!")
            setLoading(false)
            return
        }
        if (caseSignUpSignIn === 'signin') {
            let res = await userLoginServiceRedux1(email, password)
            if (res) {
                dispatch(userInfo(res))
                setLoading(false)
                form.resetFields();
                setIsShowModal(false)
                navigate('/')
            }
        }
        else if (caseSignUpSignIn === 'signup') {
            if (password !== confirmPassword) {
                message.error("Mật khẩu không khớp!")
                setLoading(false)
                return
            }
            let res = await userSignUpService({
                email,
                password,
                confirmPassword
            })
            if (res?.errCode === 0) {
                message.success("Đăng ký thành công!")
                setCaseSignUpSignIn("signin")
                form.resetFields();
                setLoading(false)
            }
            else {
                message.error(res?.message)
                setLoading(false)
            }
        }
    };

    const handleGoSignIn = () => {
        form.resetFields();
        setCaseSignUpSignIn('signin')
    }

    const handleGoSignUp = () => {
        form.resetFields();
        setCaseSignUpSignIn('signup')
    }

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
                            <Spin spinning={loading}>
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
                                            onClick={() => handleGoSignUp()}>
                                            Tạo tài khoản
                                        </span>
                                    </div>
                                </div>
                            </Spin>
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
                            <Spin spinning={loading}>
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
                                            onClick={() => handleGoSignIn()}>
                                            Đăng nhập
                                        </span>
                                    </div>
                                </div>
                            </Spin>
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

