import Customer from "../../../models/Customer.model.js"
import SellerOrder from "../../../models/SellerOrder.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"



const GetSellerOrderInSequence = async (req, res, next) => {
    if (req.role == 'customer') {
        res.status(400).json(new ApiError(400, 'Customer Cannot Get Seller Orders'))
        return
    }

    const sellerId = req.params.sellerId
    const skip = req.params.skip
    const limit = req.params.limit

    let totalOrders 
    if (skip == 0) {
        totalOrders = await SellerOrder.countDocuments({'sellerId': sellerId})
    }

    const sellerOrders = await SellerOrder.find({'sellerId': sellerId}).skip(skip).limit(limit)

    if (sellerOrders.length == 0) {
        res.status(200).json(new ApiResponse(200, 'No Active Seller Order Available'))
        return
    }

    const deliveryInfo = {}
    const totalSellerOrders = sellerOrders.length
    for (let i = 0; i < totalSellerOrders; i++) {
        const sellerOrder = sellerOrders[i]
        const customer = await Customer.findOne({'_id': sellerOrder.customerId})
        const deliveryDetails = {
            name: customer.name,
            phoneNo: customer.phoneNo,
            province: customer.province,
            city: customer.city,
            address: customer.address,
        }
        deliveryInfo[(sellerOrder._id)] = deliveryDetails
    }

    res.status(200).json(new ApiResponse(200, 'success', {'sellerOrders': sellerOrders, 'deliveryInfo': deliveryInfo, 'totalOrders': totalOrders}))
    
    // console.log(await SellerOrder.find({'sellerId': sellerId}))

    return

}





export default GetSellerOrderInSequence


