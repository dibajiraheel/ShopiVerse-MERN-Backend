import config from "../../../../config.js"
import Customer from "../../../models/Customer.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"
import { EncryptPassword, VerifyPassword } from "../BcryptPassword.js"
import { VerifyAccessToken, VerifyRefreshToken } from "../TokensJwt.js"







const CustomerUpdatePassword = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (accessToken && (accessToken != '')) {
        const userInfo = VerifyAccessToken(accessToken)
        // console.log('USER INFO GOT FROM ACCESS TOKEN WHILE UPDATING PASSWORD', userInfo);
        const foundUser = await Customer.findOne({'email': userInfo.email})
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'Authentication Failed'))
            return
        }

        else {
            const newPassword = req.body.newPassword
            const encryptedPassword = await EncryptPassword(newPassword)
            foundUser.password = encryptedPassword
            await foundUser.save()
            // console.log('USER AFTER UPDATING PASSWORD', foundUser);
            // console.log('UPDATED FROM ACCESS TOKEN WAY');
            
        }
    }
    
    else {
        const otp = req.cookies.otp
        const foundUser = await Customer.findOne({'otp': otp})
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'Invalid OTP Found From Cookies'))
            return
        }
        
        else {
            if (foundUser.isOtpVerified == false) {
                res.status(400).json(new ApiError(400, 'OTP Is Not Verified'))
                return
            }
            
            else {
                const newPassword = req.body.newPassword
                const encryptedPassword = await EncryptPassword(newPassword)
                foundUser.password = encryptedPassword
                foundUser.otp = ''
                foundUser.isOtpVerified = false
                await foundUser.save()
                
                // console.log('USER AFTER UPDATING PASSWORD', foundUser);
                // console.log('UPDATED FROM OTP WAY');
                
                res.clearCookie('otp', {httpOnly: false, sameSite: 'None', secure: true}).status(200).json(new ApiResponse(200, 'success'))
            }

        }


    }



}




export default CustomerUpdatePassword

