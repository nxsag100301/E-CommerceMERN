import axios from "./axios.customize"

const postCreateOrder = async (data) => {
    return await axios.post('/order/create', data)
}

export {
    postCreateOrder
}