import config from "../../config.js"
import { GenerateAccessToken, GenerateTokens, VerifyAccessToken, VerifyRefreshToken } from "../controller/auth/TokensJwt.js"
import Customer from "../models/Customer.model.js"
import Seller from "../models/Seller.model.js"
import { ApiError } from "../utils/ApiError.js"


const AuthenticateUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    // console.log('COOKIES RECEIVED', req.cookies);
    // console.log('COOKIES', req.cookies.accessToken, '---', req.cookies._id);
    
    
    // console.log('ACCESS TOKEN RECEIVED', accessToken);
    

    // No Access Token Found
    // console.log('IS ACCESS TOKEN NULL', accessToken == null, typeof(accessToken));
    
    if ((!accessToken) || (accessToken == 'null')) {
        res.status(400).json(new ApiError(400, 'Login First'))
        return
    }

    // Access Token Found
    let userInfo = VerifyAccessToken(accessToken)
    // console.log('USER INFO RECEIVED AFTER ACCESS TOKEN VERFICATION', userInfo);
    
    // Access Token Not Expired
    if (userInfo?._id) {
        // console.log('ACCESS TOKEN VALID');
        req.role = userInfo.role
        next()
        return
    }
    
    // Access Token Expired
    // console.log('ACCESS TOKEN EXPIRED');
    const userId = req.cookies._id

    // Find User In Customer Model
    const customerUser = await Customer.findOne({'_id': userId})
    
    // User Not Found In Customer Model
    if (customerUser == null) {
        // Find User In Seller Model
        // console.log('USER NOT FOUND IN CUSTOMER');
        // console.log('ID RECEIVED', userId);
        
        const sellerUser = await Seller.findOne({'_id': userId})

        // User Not Found In Seller Model
        if (sellerUser == null) {
            // console.log('USER NOT FOUND IN SELLER');
            res.status(400).json(new ApiError(400, 'Invalid User'))
            return
        }

        // User Found In Seller Model
        // console.log('USER FOUND IN SELLER');
        const refreshToken = sellerUser.refreshToken

        // Verify Refresh Token
        const userInfo = VerifyRefreshToken(refreshToken)

        // Refresh Token Valid
        if (userInfo?._id) {
            // Generate Access Token
            // console.log('SELLER REFRESH TOKEN VERIFIED');
            const accessToken = GenerateAccessToken(sellerUser._id, sellerUser.email, 'seller')
            req.role = 'seller'
            res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'None', secure: true}).cookie('_id', ((sellerUser._id).toHexString()), {httpOnly: true, sameSite: 'None', secure: true}).cookie('profilePicUrl', sellerUser.profilePicUrl, {httpOnly: true, sameSite: 'None', secure: true})
            next()
            return
        }

        // Refresh Token Expired
        // console.log('SELLER REFRESH TOKEN EXPIRED');
        const { 'accessToken': newAccessToken, 'refreshToken': newRefreshToken } = GenerateTokens(sellerUser._id, sellerUser.email, 'seller')
        sellerUser.refreshToken = newRefreshToken
        await sellerUser.save()
        req.role = 'seller'
        res.cookie('accessToken', newAccessToken, {httpOnly: true, sameSite: 'None', secure: true}).cookie('_id', ((sellerUser._id).toHexString()), {httpOnly: true, sameSite: 'None', secure: true}).cookie('profilePicUrl', sellerUser.profilePicUrl, {httpOnly: true, sameSite: 'None', secure: true})
        next()
        return
    }
    
    // User Found In Customer Model
    // console.log('USER FOUND IN CUSTOMER');
    const refreshToken = customerUser.refreshToken
    userInfo = VerifyRefreshToken(refreshToken)

    // Refresh Token Is Valid
    if (userInfo?._id) {
        // console.log('CUSTOMER REFRESH TOKEN VERIFIED');
        const accessToken = GenerateAccessToken(customerUser._id, customerUser.email, 'customer')
        req.role = 'customer'
        res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'None', secure: true}).cookie('_id', ((customerUser._id).toHexString()), {httpOnly: true, sameSite: 'None', secure: true}).cookie('profilePicUrl', customerUser.profilePicUrl, {httpOnly: true, sameSite: 'None', secure: true})
        next()
        return
    }

    // Refresh Token Is Expired
    // console.log('CUSTOMER REFRESH TOKEN EXPIRED');
    const { 'accessToken': newAccessToken, 'refreshToken': newRefreshToken } = GenerateTokens(customerUser._id, customerUser.email, 'customer')
    customerUser.refreshToken = newRefreshToken
    // console.log('NEW BOTH TOKENS GENERATED FOR CUSTOMER', newAccessToken, '--------', newRefreshToken, '-----id', customerUser._id, '----email', customerUser.email);
    
    await customerUser.save()
    req.role = 'customer'
    res.cookie('accessToken', newAccessToken, {httpOnly: true, sameSite: 'None', secure: true}).cookie('_id', ((customerUser._id).toHexString()), {httpOnly: true, sameSite: 'None', secure: true}).cookie('profilePicUrl', customerUser.profilePicUrl, {httpOnly: true, sameSite: 'None', secure: true})
    next()
    return
}



export default AuthenticateUser

