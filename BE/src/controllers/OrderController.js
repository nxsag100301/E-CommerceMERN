const { createOrderService, getOrderService, getDetailOrderService } = require("../services/OrderService")


const createOrder = async (req, res) => {
    try {
        const data = req.body
        let response = await createOrderService(data)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const getOrder = async (req, res) => {
    try {
        const id = req.params.id
        let response = await getOrderService(id)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const getDetailOrder = async (req, res) => {
    try {
        const id = req.params.id
        let response = await getDetailOrderService(id)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

module.exports = {
    createOrder, getOrder, getDetailOrder
}