import Customer from "../../../models/Customer.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"





const GetDeliveryDetails = async (req, res, next) => {

    const customerId = req.cookies._id

    const customer = await Customer.findOne({'_id': customerId})
    if (customer == null) {
        res.status(400).json(new ApiError(400, 'Invalid Customer Id'))
        return
    }

    const deliveryDetails = {
        name: customer.name,
        phoneNo: customer.phoneNo,
        province: customer.province,
        city: customer.city,
        address: customer.address,
    }


    res.status(200).json(new ApiResponse(200, "success", deliveryDetails))
    return

}




export default GetDeliveryDetails