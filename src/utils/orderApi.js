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

const postVNPayOrder = async (data) => {
    return await axios.post('/payment/create_payment_url_vnpay', data)
}

const vnPayReturn = async (vnp_Params) => {
    return await axios.get('/payment/vnpay_return', { params: vnp_Params })
}

export {
    postCreateOrder, getOrder, getDetailOrder, getClientIdService,
    postVNPayOrder, vnPayReturn
}