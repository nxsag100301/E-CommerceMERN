const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")

const createOrderService = (data) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, user, isPaid, paidAt } = data
        try {
            if (!orderItems || !paymentMethod || !itemsPrice || !shippingPrice ||
                !totalPrice || !fullName || !address || !phone || !user) {
                reject({
                    errCode: 1,
                    message: "Missing input params!"
                })
            }
            else {
                for (const item of orderItems) {
                    const product = await Product.findById(item.product);
                    if (!product) {
                        throw new Error(`Product with ID ${item.product} not found`);
                    }
                    else if (product.countInStock < item.amount) {
                        reject({
                            errCode: 2,
                            message: `Số lượng ${item.name} chỉ còn ${product.countInStock}`
                        })
                    }
                    else {
                        const updatedProduct = await Product.findByIdAndUpdate(
                            item.product,
                            {
                                $set: {
                                    countInStock: product.countInStock - item.amount,
                                    selled: product.selled + item.amount
                                }
                            },
                            { new: true, runValidators: true }
                        );
                        if (updatedProduct) {
                            const createOrder = await Order.create({
                                orderItems,
                                shippingAddress: {
                                    fullName: fullName,
                                    address: address,
                                    phone: phone,
                                },
                                paymentMethod: paymentMethod,
                                itemsPrice: itemsPrice,
                                shippingPrice: shippingPrice,
                                isPaid: isPaid,
                                paidAt: paidAt,
                                totalPrice: totalPrice,
                                user: user,
                            })
                            resolve({
                                errCode: 0,
                                message: "Order created!",
                                order: createOrder
                            })
                        }
                    }
                }
            }
        }
        catch (e) {
            console.error(e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            })
        }
    })
}

const getOrderService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                reject({
                    errCode: 1,
                    message: "Missing input params!"
                })
            }
            else {
                const order = await Order.find({
                    user: id
                })
                resolve({
                    errCode: 0,
                    message: "Get order success!",
                    order
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const getDetailOrderService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                reject({
                    errCode: 1,
                    message: "Missing input params!"
                })
            }
            else {
                const order = await Order.findById(id)
                resolve({
                    errCode: 0,
                    message: "Get detail order success!",
                    order
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrderService, getOrderService,
    getDetailOrderService
}