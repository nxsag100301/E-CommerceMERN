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

const getClientIdService = async () => {
    return await axios.get('/payment/config')
}

export {
    postCreateOrder, getOrder, getDetailOrder, getClientIdService
}