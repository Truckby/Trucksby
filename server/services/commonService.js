const User = require('../models/userModel');
const { loadDBModel } = require('../utils/modelUtils');

const fetchUserId = async (filter) => {
    const user = await User.findOne(filter);
    if (!user) {
        const error = new Error('User not found!');
        error.code = 404;
        throw error;
    }
    return user._id.toString();
};

module.exports = {
    fetchUserId,
}

