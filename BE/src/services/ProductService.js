const Product = require("../models/ProductModel")


const createProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {name, image, type, price, countInStock, rating, description, discount} = data 
            if(!name || !image || !type || !price || !countInStock){
                reject({
                    errCode: 1,
                    message: 'Missing input params!'
                })
            }
            else{
                const isProductExist = await Product.findOne({name})
                if(isProductExist){
                    reject({
                        errCode: 2,
                        message: 'The name of the product already exists!'
                    })
                }
                else{
                    const newProduct = await Product.create({
                        name, 
                        image, 
                        type, 
                        price, 
                        countInStock, 
                        rating, 
                        description, 
                        discount
                    })
                    resolve({
                        errCode: 0,
                        message: "Product created!",
                        newProduct
                    })
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

const updateProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {id, name, image, type, price, countInStock, rating, description, discount} = data 
            if(!id){
                reject({
                    errCode: 1,
                    message: 'Missing input params!'
                })
            }
            else{
                const updateProduct = await Product.findByIdAndUpdate(
                    { _id: id },
                    {
                        name, image, type, price, countInStock, rating, description, discount
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
                if(!updateProduct){
                    reject({
                        errCode: 2,
                        message: `Product doesn't exists!`
                    })
                }
                else{
                    resolve({
                        errCode: 0,
                        message: "Product updated!",
                        updateProduct
                    })
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

const detailProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!id){
                reject({
                    errCode: 1,
                    message: 'Missing input params!'
                })
            }
            else{
                const product = await Product.findOne({_id: id})
                if(!product){
                    reject({
                        errCode: 2,
                        message: `Product doesn't exists!`
                    })
                }
                else{
                    resolve({
                        errCode: 0,
                        message: "Get detail product success!",
                        product
                    })
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

const deleteProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!id){
                reject({
                    errCode: 1,
                    message: 'Missing input params!'
                })
            }
            else{
                const product = await Product.findByIdAndDelete({_id: id})
                if(!product){
                    reject({
                        errCode: 2,
                        message: `Product doesn't exists!`
                    })
                }
                else{
                    resolve({
                        errCode: 0,
                        message: "Delete product success!",
                    })
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

const getAllProductService = (limit, currentPage, sort, filterBy, filterValue) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = limit * (currentPage - 1)
            const totalItems = await Product.countDocuments()
            const totalPages = Math.ceil(totalItems / (limit || 10))
            if(sort){
                const objectSort = {};
                const [a, b] = sort.split(' '); 
                objectSort[b] = a;           
                const allProductSort = await Product.find().limit(limit || 10).skip(offset || 0).sort(objectSort)
                resolve({
                    errCode: 0,
                    message: `Sort product by "${b}" success!`,
                    allProductSort,
                    totalProduct: totalItems,
                    totalPages,
                    currentPage
                })
            }
            else if(filterBy && filterValue){
                const objectFilter = {}
                objectFilter[filterBy] = { $regex: filterValue, $options: 'i' }
                const allProductFilter= await Product.find(objectFilter).limit(limit || 10).skip(offset || 0)
                resolve({
                    errCode: 0,
                    message: `Filter product by "${filterBy}" success!`,
                    allProductFilter,
                    totalProduct: totalItems,
                    totalPages,
                    currentPage
                })
            }
            else{
                const allProduct = await Product.find().limit(limit || 10).skip(offset || 0)
                resolve({
                    errCode: 0,
                    message: "Get all product success!",
                    allProduct,
                    totalProduct: totalItems,
                    totalPages,
                    currentPage
                })
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

const getInStockProductService = (limit, currentPage, sort, filterBy, filterValue) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = limit * (currentPage - 1);

            // Base query: Chỉ sản phẩm có countInStock > 0
            const baseQuery = { countInStock: { $gt: 0 } };

            // Đếm tổng số sản phẩm phù hợp
            const totalItems = await Product.countDocuments(baseQuery);
            const totalPages = Math.ceil(totalItems / (limit || 10));

            // Trường hợp sort
            if (sort) {
                const objectSort = {};
                const [a, b] = sort.split(' ');
                objectSort[b] = a;

                const inStockProductsSorted = await Product.find(baseQuery)
                    .limit(limit || 10)
                    .skip(offset || 0)
                    .sort(objectSort);

                resolve({
                    errCode: 0,
                    message: `Sort in-stock products by "${b}" success!`,
                    products: inStockProductsSorted,
                    totalProduct: totalItems,
                    totalPages,
                    currentPage
                });
            }
            // Trường hợp filter
            else if (filterBy && filterValue) {
                const objectFilter = { ...baseQuery };
                objectFilter[filterBy] = { $regex: filterValue, $options: 'i' };

                const inStockProductsFiltered = await Product.find(objectFilter)
                    .limit(limit || 10)
                    .skip(offset || 0);

                resolve({
                    errCode: 0,
                    message: `Filter in-stock products by "${filterBy}" success!`,
                    products: inStockProductsFiltered,
                    totalProduct: totalItems,
                    totalPages,
                    currentPage
                });
            }
            // Trường hợp không sort hoặc filter
            else {
                const inStockProducts = await Product.find(baseQuery)
                    .limit(limit || 10)
                    .skip(offset || 0);

                resolve({
                    errCode: 0,
                    message: "Get all in-stock products success!",
                    products: inStockProducts,
                    totalProduct: totalItems,
                    totalPages,
                    currentPage
                });
            }
        } catch (e) {
            console.error(e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            });
        }
    });
};



module.exports = {
    createProductService, updateProductService,
    detailProductService, deleteProductService,
    getAllProductService, getInStockProductService
}

// const createProductService = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
            
//         }
//         catch (e) {
//             console.error(e);
//             reject({
//                 errCode: 500,
//                 message: 'Internal server error'
//             })
//         }
//     })
// }