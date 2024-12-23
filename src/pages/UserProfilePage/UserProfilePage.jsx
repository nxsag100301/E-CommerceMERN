import React, { useEffect, useState } from 'react';
import './UserProfilePage.scss'
import { Button, Form, Input, message } from 'antd';
import { postUpdateUser } from '../../utils/userApi';
import { jwtDecode } from 'jwt-decode';
import noAvatar from '../../assets/image/no-avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../redux/slices/userSlice';


const UserProfilePage = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [address, setAddress] = useState()
    const [avatar, setAvatar] = useState()
    const [avatarPreView, setAvatarPreView] = useState()
    const [change, setChange] = useState(false)
    const dispatch = useDispatch()
    const userProfile = useSelector((state) => state.user);

    useEffect(() => {
        if (userProfile) {
            const { name, email, phone, address, avatar } = userProfile;
            setName(name);
            setEmail(email);
            setPhoneNumber(phone);
            setAddress(address);
            setAvatarPreView(avatar || noAvatar);
        }
    }, [userProfile]);

    useEffect(() => {
        hasChangeProfile()
    }, [name, phoneNumber, address, avatarPreView])

    const hasChangeProfile = () => {
        if (userProfile) {
            if (
                name !== userProfile.name || phoneNumber !== userProfile.phone
                || address !== userProfile.address || avatarPreView !== userProfile.avatar
            ) {
                setChange(true)
            }
            else {
                setChange(false)
            }

        }

    }

    const access_token = localStorage.getItem('access_token')
    let userId = ''
    if (access_token) {
        const decoded = jwtDecode(access_token);
        if (!decoded) {
            userId = ''
        }
        else {
            userId = decoded?.payload?.id
        }
    }
    else {
        userId = ''
    }


    const handleChangeAvatar = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarPreView(URL.createObjectURL(file))
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result
                setAvatar(base64);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleUpdateUser = async () => {
        let res = await postUpdateUser({
            id: userId,
            name,
            address,
            phone: phoneNumber,
            avatar: avatar
        })
        if (res?.errCode === 0) {
            message.success("Cập nhật thông tin thành công!")
            setChange(false)
            const payload = {
                name: res?.userUpdate?.name,
                email: res?.userUpdate?.email,
                avatar: res?.userUpdate?.avatar,
                phone: res?.userUpdate?.phone,
                address: res?.userUpdate?.address,
            }
            dispatch(userInfo(payload))
        }
        else {
            message.error(res?.message)
        }
    }

    return (
        <div className='user-profile-container'>
            <div className='user-profile-main-content'>
                <div className='user-profile-title'>
                    Thông tin tài khoản
                </div>
                <div className='top-content'>
                    <div className='avatar'>
                        <div className='border-avatar'>
                            <input id="change-avatar" type='file' hidden onChange={(event) => handleChangeAvatar(event)} />
                            <label htmlFor="change-avatar" >
                                <img alt="avatar" src={avatarPreView} />
                            </label>
                        </div>

                    </div>
                    <div className='infor'>
                        <Form
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 7 }}
                            labelAlign="left"
                        >
                            <Form.Item label="Họ và Tên">
                                <Input
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input readOnly value={email} />
                            </Form.Item>
                            <Form.Item label="Số điện thoại">
                                <Input value={phoneNumber} onChange={(event) => {
                                    setPhoneNumber(event.target.value)
                                }} />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                wrapperCol={{ span: 10 }}
                            >
                                <Input value={address} onChange={(event) => {
                                    setAddress(event.target.value)
                                }} />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 2,
                                    span: 16,
                                }}
                            >
                                <Button onClick={() => handleUpdateUser()}
                                    type="primary" htmlType="submit" disabled={!change}>
                                    Lưu thay đổi
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
                <div className='bot-content'>

                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;



