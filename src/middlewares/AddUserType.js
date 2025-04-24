



const CustomerUserType = (req, res, next) => {
    req.authUser = 'customer'
    next()
}

const SellerUserType = (req, res, next) => {
    req.authUser = 'seller'
    next()
}


export { CustomerUserType, SellerUserType }