import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import { getAllProduct } from '../../utils/productApi';
import { debounce } from 'lodash';
import DetailProductModal from './AdminModal/DetailProductModal';
import DeleteProductModal from './AdminModal/DeleteProductModal';


const TableProductComponent = (props) => {
    const { valueSearch, actionSuccess, setActionSuccess } = props
    const [listProduct, setListProduct] = useState()
    const [limit, setLimit] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalProduct, setTotalProduct] = useState()
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [isShowDelete, setIsShowDelete] = useState(false)
    const [productInfo, setProductInfo] = useState()

    useEffect(() => {
        if (!valueSearch || actionSuccess === true) {
            fetchAllProduct()
        }
        else {
            fetchFilterProduct()
        }
        return () => {
            fetchFilterProduct.cancel()
        };
    }, [valueSearch, currentPage, actionSuccess])

    const fetchFilterProduct = debounce(async () => {
        const data = { limit, currentPage, filterBy: "name", filterValue: valueSearch }
        let res = await getAllProduct(data)
        if (res?.errCode === 0) {
            setListProduct(res.allProductFilter.map(item => ({ ...item, key: item._id })));
            setTotalProduct(res.allProductFilter.length)
            setLimit(4)
        }
        else {
            console.log("Error from server")
        }
    }, 500)

    const fetchAllProduct = async () => {
        const data = { limit, currentPage }
        let res = await getAllProduct(data)
        if (res?.errCode === 0) {
            setListProduct(res.allProduct.map(item => ({ ...item, key: item._id })));
            setTotalProduct(res.totalProduct)
            setActionSuccess(false)

        }
        else {
            console.log("Error from server")
            setActionSuccess(false)
        }
    }

    const handleDetailProduct = (product) => {
        setProductInfo(product)
        setIsShowDetail(true)
    }

    const handleDeleteProduct = (product) => {
        setProductInfo(product)
        setIsShowDelete(true)
    }


    const paginationConfig = {
        current: currentPage,
        pageSize: limit,
        total: totalProduct,
        onChange: (page, pageSize) => {
            setCurrentPage(page)
        },
    }
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <div style={{ width: "300px" }}>{name}</div>
            )
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (imageUrl) => (
                <img style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    src={imageUrl} alt="Sản phẩm" className="product-image" />
            ),
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <div>{price.toLocaleString('vi-VN')}&#8363;</div>
            ),
        },
        {
            title: 'Tồn kho',
            dataIndex: 'countInStock',
            key: 'countinstock',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleDetailProduct(record)} type='primary'>Chi tiết</Button>
                    <Button onClick={() => handleDeleteProduct(record)} type="primary" danger>Xóa</Button>
                </Space>
            ),
        },
    ]
    return (
        <>
            <DetailProductModal
                productInfo={productInfo}
                isShowDetail={isShowDetail}
                setIsShowDetail={setIsShowDetail}
                setActionSuccess={setActionSuccess} />
            <DeleteProductModal
                productInfo={productInfo}
                isShowDelete={isShowDelete}
                setIsShowDelete={setIsShowDelete}
                actionSuccess={actionSuccess}
                setActionSuccess={setActionSuccess} />
            <Table columns={columns} dataSource={listProduct} pagination={paginationConfig} />
        </>
    )
}

export default TableProductComponent;