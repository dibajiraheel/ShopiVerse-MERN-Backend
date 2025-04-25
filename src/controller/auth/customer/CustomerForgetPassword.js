import otpGenerator from 'otp-generator'
import SendMail from '../../../utils/SendEmail.js';
import Customer from '../../../models/Customer.model.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';
import { ApiError } from '../../../utils/ApiError.js';


const CustomerForgetPassword = async (req, res, next) => {
    const email = req.body.email
    const subject = "ShopiVerse OTP to update password"
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const content = `Your OTP to update password is ${otp}`
    
    const userFound = await Customer.findOne({'email': email})
    
    if (userFound == null) {
        res.status(400).json(new ApiError(400, 'Email Not Found'))
        return
    }

    else {
        userFound.otp = otp
        await userFound.save()
    
        // console.log('USER AFTER OTP ADDED', userFound);
        
        const response = await SendMail(email, subject, content)
        // console.log('RESPONSE AFTER SENDING EMAIL', response);
        
        for (let cookie in req.cookies) {
            res.clearCookie(cookie, {httpOnly: true, sameSite: 'None', secure: true, path: '/'})
        }

        res.status(200).json(new ApiResponse(200, 'success'))
        return
    }
    
}



export default CustomerForgetPassword

