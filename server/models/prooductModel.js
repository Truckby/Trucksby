const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;