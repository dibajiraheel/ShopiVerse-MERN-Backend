import { ApiError } from "../../../utils/ApiError.js"
import CustomerOrder from "../../../models/CustomerOrder.model.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"





const GetCustomerOrder = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, 'Seller Cannot Get Customer Order'))
        return
    }

    const customerId = req.params.customerId
    const skip = req.params.skip
    const limit = req.params.limit

    let totalOrders
    if (skip == 0) {
        totalOrders = await CustomerOrder.countDocuments({'customerId': customerId})
    }

    const customerOrders = await CustomerOrder.find({'customerId': customerId}).skip(skip).limit(limit)
    if (customerOrders.length == 0) {
        res.status(200).json(new ApiResponse(200, 'No Active Order Available', customerOrders))
        return
    }

    res.status(200).json(new ApiResponse(200, 'success', {orders: customerOrders, totalOrders: totalOrders}))
    return

}




export default GetCustomerOrder