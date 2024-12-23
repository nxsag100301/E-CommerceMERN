import React from 'react';
import { message, Modal } from 'antd';
import { deleteUser } from '../../../utils/userApi';


const DeleteUserModal = (props) => {
    const { isShowDelete, setIsShowDelete, setActionSuccess, userInfor } = props

    const handleConfirmDelete = async () => {
        const res = await deleteUser(userInfor?._id)
        if (res?.errCode === 0) {
            message.success("Xóa người dùng thành công!")
            setActionSuccess(true)
            setIsShowDelete(false)
        }
        else {
            message.error(res?.message)
        }
    }

    const handleCancel = () => {
        setIsShowDelete(false);
    }
    return (
        <div>
            <Modal title="Xóa người dùng" open={isShowDelete} onOk={handleConfirmDelete} onCancel={handleCancel}>
                <p>Bạn có chắc muốn xóa <b>{userInfor?.name}</b></p>
            </Modal>
        </div>
    );
};


export default DeleteUserModal;

