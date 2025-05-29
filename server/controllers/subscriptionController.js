const Product = require('../models/prooductModel');
const subscriptionService = require('../services/subscriptionService');

const GetUserSubscriptionInfo = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const info = await subscriptionService.getUserSubscriptionInfo(userId);
        let productData;
        console.log(info.productId, 'info')

        if (info.productId) {
            productData = await Product.findOne({ productId: info.productId });
        }

        res.status(200).json({ info, productData });
    } catch (error) {
        console.log(error, 'GetUserSubscriptionInfo')
        next(error);
    }
};

module.exports = {
    GetUserSubscriptionInfo,
};
