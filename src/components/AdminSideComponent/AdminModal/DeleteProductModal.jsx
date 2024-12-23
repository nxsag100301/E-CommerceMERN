import React from 'react';
import { message, Modal } from 'antd';
import { deleteProduct } from '../../../utils/productApi';


const DeleteProductModal = (props) => {
    const { productInfo, isShowDelete, setIsShowDelete, setActionSuccess } = props

    const handleConfirmDelete = async () => {
        setActionSuccess(true)
        const res = await deleteProduct(productInfo?._id)
        if (res?.errCode === 0) {
            setIsShowDelete(false)
            setActionSuccess(false)
            message.success("Xóa sản phẩm thành công!")
        }
        else {
            message.error(res?.message)
        }

    }

    return (
        <div>
            <Modal title="Xóa sản phẩm" open={isShowDelete}
                maskClosable={false}
                onOk={handleConfirmDelete}
                onCancel={() => setIsShowDelete(false)}>
                <p>Bạn có chắc muốn xóa <b>{productInfo?.name}</b></p>
            </Modal>
        </div>
    );
};


export default DeleteProductModal;

