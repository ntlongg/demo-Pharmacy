const addToCartModel = require("../../models/cartProduct");

const AddToCart = async (req, res) => {
    try {
        const addToCartProductId = req.body?._id;
        const addToCartProductId1 = req.body?.productId;
        const currentUserId = req.userId
        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId }, {
        });

        // Xoá dữ liệu từ addToCartModel sau khi đặt hàng thành công
        await addToCartModel.deleteOne({productId: addToCartProductId1 });

        res.json({
            message: "Đặt hàng thành công",
            data: updateProduct,
            error: false,
            success: true
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = AddToCart;