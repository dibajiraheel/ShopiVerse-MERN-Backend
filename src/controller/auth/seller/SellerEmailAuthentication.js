import Customer from "../../../models/Customer.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { EncryptPassword, VerifyPassword } from "../BcryptPassword.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"
import { GenerateAccessToken, GenerateTokens } from "../TokensJwt.js"
import Seller from "../../../models/Seller.model.js"


const SellerSignup = async (req, res, next) => {
    const credentials = req.body
    // console.log('CREDENTIALS', credentials);
    
    const foundUser = await Seller.findOne({'email': credentials.email})
    if (foundUser) {
        res.status(400).json(new ApiError(400, 'Email Already Registered As Seller'))
        return
    }

    const foundCustomer = await Customer.findOne({'email': credentials.email})
    if (foundCustomer) {
        res.status(400).json(new ApiError(400, 'Email Already Registered As Customer'))
        return
    }
    
    else {
        if (!(credentials.userName && credentials.email && credentials.password)){
            res.status(400).json(new ApiError(400, 'Send all credentials. User name, Email, Password'))
            return
        }
    
        else {
            // console.log('Encrypting Passowrd');
            const encryptedPassword = await EncryptPassword(credentials.password)
            // console.log('Encrypted Password', encryptedPassword);
            
            credentials.password = encryptedPassword
            credentials.SignupVia = 'email'
            const newUser = await new Seller(credentials)
            await newUser.save()
            res.status(200).json(new ApiError(200, 'Signed Up Successfully'))
        }
    }
    
}


const SellerLogin = async (req, res, next) => {
    const credentials = req.body
    // console.log('CREDENTIALS FOUND IN LOGIN', credentials);
    
    if (credentials.email && credentials.password) {
        const foundUser = await Seller.findOne({'email': credentials.email})
        // console.log('Found User', foundUser);
        // console.log('User Found In Seller', foundUser);
        
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'Email Not Registered'))
            return
        }
        else {
            const isPasswordVerified = await VerifyPassword(credentials.password, foundUser.password)
            // console.log('Is Password Verified', isPasswordVerified);
            
            if (!isPasswordVerified) {
                res.status(400).json(new ApiResponse(400, 'Incorrect Password'))
                return
            }
            else {
                if (foundUser.refreshToken) {
                    const accessToken = GenerateAccessToken(foundUser._id, foundUser.email, 'seller')
                    res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'None', secure: true}).cookie('_id', ((foundUser._id).toHexString()), {httpOnly: true, sameSite: 'None', secure: true}).cookie('profilePicUrl', foundUser.profilePicUrl ? foundUser.profilePicUrl : '', {httpOnly: true, sameSite: 'None', secure: true}).status(200).json(new ApiResponse(200, 'Logged In Successfully'))    
                    return
                }
                
                else{
                    const {accessToken, refreshToken} = GenerateTokens(foundUser._id, foundUser.email, 'seller')
                    foundUser.refreshToken = refreshToken
                    await foundUser.save()
                    res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'None', secure: true}).cookie('_id', ((foundUser._id).toHexString()), {httpOnly: true, sameSite: 'None', secure: true}).cookie('profilePicUrl', foundUser.profilePicUrl ? foundUser.profilePicUrl : '', {httpOnly: true, sameSite: 'None', secure: true}).status(200).json(new ApiResponse(200, 'Logged In Successfully'))
                    return
                }
            }
        }
    }

    else {
        res.status(400).json(new ApiError(400, 'Send All Credentials. Email and Password'))
        return
    }
}


const SellerLogout = (req, res, next) => {
    // console.log('Logout Called');
    
    const cookies = req.cookies
    if (cookies.accessToken) {
        (Object.keys(cookies)).forEach((cookie) => {
            res.clearCookie(cookie, {httpOnly: true, sameSite: 'None', secure: true})
        })
        res.status(200).json(new ApiResponse(200, 'Logged out Successfully'))
        return
    }
    else {
        res.status(400).json(new ApiError(400, 'Already Logged out'))
        return
    }
}

export { SellerSignup, SellerLogin, SellerLogout }




