import Customer from "../../models/Customer.model.js"
import Seller from "../../models/Seller.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"



const GetProfile = async (req, res, next) => {

    if (req.authUser == 'customer') {
        const userId = req.params.customerId
        const foundUser = await Customer.findOne({'_id': userId})
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'Invalid User Id'))
            return
        }
        const profile = {
            'userName': foundUser.userName,
            'email': foundUser.email,
            'phoneNo': foundUser.phoneNo,
            'address': foundUser.address,
            'province': foundUser.province,
            'city': foundUser.city
        }
        res.status(200).json(new ApiResponse(200, 'success', profile))
        return
    }

    else if (req.authUser == 'seller') {
        const userId = req.cookies._id
        const foundUser = await Seller.findOne({'_id': userId})
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'Invalid User Id'))
            return
        }
        const profile = {
            'userName': foundUser.userName,
            'email': foundUser.email,
            'phoneNo': foundUser.phoneNo,
            'address': foundUser.address,
            'cnic': foundUser.cnic,
            'province': foundUser.province,
            'city': foundUser.city
        }
        res.status(200).json(new ApiResponse(200, 'success', profile))
        return
    }
}


export default GetProfile