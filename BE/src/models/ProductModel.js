const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: false, default: 5 },
        description: { type: String, required: false },
        discount: { type: Number, required: false },
        selled: { type: Number, required: false, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
