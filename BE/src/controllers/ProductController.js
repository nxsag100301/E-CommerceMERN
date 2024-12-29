const { createProductService, updateProductService, detailProductService, deleteProductService, getAllProductService, getInStockProductService } = require("../services/ProductService")


const createProduct = async (req, res) => {
    try {
        const data = req.body
        let response = await createProductService(data)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const updateProduct = async (req, res) => {
    try {
        const data = req.body
        let response = await updateProductService(data)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const detailProduct = async (req, res) => {
    try {
        const id = req.query.id
        let response = await detailProductService(id)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.query.id
        let response = await deleteProductService(id)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, currentPage, sort, filterBy, filterValue } = req.query
        let response = await getAllProductService(limit, currentPage, sort, filterBy, filterValue)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const getAllProductInStock = async (req, res) => {
    try {
        const { limit, currentPage, sort, filterBy, filterValue } = req.query
        let response = await getInStockProductService(limit, currentPage, sort, filterBy, filterValue)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}



module.exports = {
    createProduct, updateProduct,
    detailProduct, deleteProduct,
    getAllProduct, getAllProductInStock
}

// const createProduct = async (req, res) => {
//     try {
//         const data = req.body
// let response = await createProductService(data)
// return res.status(200).json(response)
//     }
//     catch (e) {
//         console.log(e)
//         return res.status(404).json(e)
//     }
// }