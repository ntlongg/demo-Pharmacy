


const backendDomin = "http://localhost:7203"

const SummaryApi = {
    signUP :{
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIN : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/user-logout`,
        method : "get"
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    createUser : {
        url : `${backendDomin}/api/user-create`,
        method : 'post'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    forgotPassword : {
        url : `${backendDomin}/api/forgot-password`,
        method : "post"
    },
    resetPassword : {
        url : `${backendDomin}/api/reset-password/:token`,
        method : "post" 
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : "get"
    },
    updateProduct : {
       url : `${backendDomin}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomin}/api/getcategory-product`,
        method : "get"
    },
    deleteUser : {
        url : `${backendDomin}/api/delete-user`,
        method : "delete"
    },
    deleteProduct : {
        url : `${backendDomin}/api/delete-product`,
        method : "delete"
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : "post"
    },
    productDetails : {
        url : `${backendDomin}/api/category-details `,
        method : "post"
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart `,
        method : "post"
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct `,
        method : "get"
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-cart-product `,
        method : "get"
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product `,
        method : "post"
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product `,
        method : "delete"
    },
    searchProduct : {
        url : `${backendDomin}/api/search `,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    verifyemail : {
        url : `${backendDomin}/api/verifyemail`,
        method : 'post'
    },
    Cartpaymemt : {
        url : `${backendDomin}/api/payment`,
        method : 'post'
    },
    Cartupdate : {
        url : `${backendDomin}/api/update-cart`,
        method : 'post'
    }
}

export default SummaryApi