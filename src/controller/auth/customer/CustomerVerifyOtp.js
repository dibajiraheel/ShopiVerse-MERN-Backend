import Customer from "../../../models/Customer.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"



const CustomerVerifyOtp = async (req, res, next) => {
    const otp = req.body.otp
    const foundUser = await Customer.findOne({'otp': otp})
    if (foundUser == null) {
        res.status(400).json(new ApiError(400, 'Invalid OTP'))
        return
    }
    else if (foundUser.otp == otp) {
        foundUser.isOtpVerified = true
        await foundUser.save()
        res.cookie('otp', otp).status(200).json(new ApiResponse(200, 'success'))
        return
    }
}


export { CustomerVerifyOtp }
