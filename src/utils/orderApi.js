import axios from "./axios.customize"

const postCreateOrder = async (data) => {
    return await axios.post('/order/create', data)
}

const getOrder = async (id) => {
    return await axios.get(`/order/detail/${id}`)
}

const getDetailOrder = async (id) => {
    return await axios.get(`/order/detail-order/${id}`)
}

export {
    postCreateOrder, getOrder, getDetailOrder
}