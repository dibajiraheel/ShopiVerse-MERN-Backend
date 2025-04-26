import SellerOrder from "../../../models/SellerOrder.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"



const GetSellerOrder = async (req, res, next) => {
    if (req.role == 'customer') {
        res.status(400).json(new ApiError(400, 'Customer Cannot Get Seller Orders'))
        return
    }

    const sellerId = req.cookies._id
    
    const sellerOrders = await SellerOrder.find({'sellerId': sellerId})

    if (sellerOrders.length == 0) {
        res.status(200).json(new ApiResponse(200, 'No Active Seller Order Available'))
        return
    }

    res.status(200).json(new ApiResponse(200, 'success', sellerOrders))
    return

}





export default GetSellerOrder


