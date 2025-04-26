const Product = require('../models/prooductModel');
const { loadDBModel } = require('../utils/modelUtils');

const fetchAllProducts = async () => {
    const product = await Product.findOne({});
    if (!product) {
        const error = new Error('Product collection not found!');
        error.code = 404;
        throw error;
    }
    const { products } = product;
    if (!products && products.length <= 0) {
        const error = new Error('Products not found!');
        error.code = 404;
        throw error;
    }
    return products;
};


module.exports = {
    fetchAllProducts,
};
