import axios from "./axios.customize"

const getAllProduct = async (data) => {
    return await axios.get('/product', {
        params: {
            limit: data.limit,
            currentPage: data.currentPage,
            filterBy: data.filterBy,
            filterValue: data.filterValue
        },
    });
}

const getAllProductInStock = async (data) => {
    return await axios.get('/product/instock', {
        params: {
            limit: data.limit,
            currentPage: data.currentPage,
            filterBy: data.filterBy,
            filterValue: data.filterValue
        },
    });
}

const postCreateProduct = async (data) => {
    return await axios.post('/product/create', data)
}

const deleteProduct = async (id) => {
    return await axios.delete('/product/delete', { params: { id } })
}

const detailProduct = async (id) => {
    return await axios.get('/product/detail', { params: { id } })
}

const putUpdateProduct = async (data) => {
    return await axios.put('/product/update', data)
}

export {
    getAllProduct, postCreateProduct, deleteProduct,
    detailProduct, putUpdateProduct, getAllProductInStock
}