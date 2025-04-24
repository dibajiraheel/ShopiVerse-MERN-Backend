import Customer from "../../models/Customer.model.js"
import Seller from "../../models/Seller.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"


const UpdateProfile = async (req, res, next) => {
    const userId = req.cookies._id
    console.log('USER ID', userId);
    console.log('ROLE', req.authUser);
    console.log('DATA RECEIVED', req.body);
    
    
    
    if (req.authUser == 'customer') {
        const foundUser = await Customer.findOne({'_id': userId})
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'Invalid User Id'))
            return
        }
        foundUser.userName = req.body.userName
        foundUser.cnic = req.body.cnic
        foundUser.phoneNo = req.body.phoneNo
        foundUser.address = req.body.address
        foundUser.province = req.body.province
        foundUser.city = req.body.city
        await foundUser.save()
        console.log('Updated User', foundUser);
        res.status(200).json(new ApiResponse(200, 'success'))
        return

    }

    else if (req.authUser == 'seller') {
        const foundUser = await Seller.findOne({'_id': userId})
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'Invalid User Id'))
            return
        }
        console.log('DATA RECEIVED TO UPDATE PROFILE', req.body);
        
        foundUser.userName = req.body.userName
        foundUser.cnic = req.body.cnic
        foundUser.phoneNo = req.body.phoneNo
        foundUser.address = req.body.address
        foundUser.province = req.body.province
        foundUser.city = req.body.city
        
        await foundUser.save()
        console.log('Updated User', foundUser);
        res.status(200).json(new ApiResponse(200, 'success'))
        return

    }
}


export default UpdateProfile






