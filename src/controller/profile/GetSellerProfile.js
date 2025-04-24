// import { ApiError } from "../../utils/ApiError.js"
// import Seller from "../../models/Seller.model.js"

// const GetSellerProfile = async (req, res, next) => {
//     if (req.role == 'customer') {
//         res.status(400).json(new ApiError(400, 'Customer Cannot Get Seller Profile'))
//         return
//     }

//     const sellerId = req.params.sellerId
//     const foundSeller = await Seller.findOne({'_id': sellerId})
//     if (!foundSeller) {
//         res.status(400).json(new ApiError(400, 'Invalid Seller Id'))
//         return
//     }



// }



// export GetSellerProfile


