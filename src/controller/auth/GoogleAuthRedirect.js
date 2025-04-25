import Customer from "../../models/Customer.model.js";
import Seller from "../../models/Seller.model.js";
import { GenerateTokens } from "./TokensJwt.js";
import config from "../../../config.js";
import { ApiError } from "../../utils/ApiError.js";

const GoogleAuthRedirect = async (req, res) => {

    if (req.query.state == 'customer') {
        // console.log('CUSTOMER REDIRECT CALLED', req.user);
        const user = req.user
        
        const foundUser = await Customer.find({'email': user.email})
        const foundSeller = await Seller.findOne({'email': user.email}) 
        // console.log('FOUND USER IN CUSTOMER ', foundUser);
        // console.log('FOUND USER IN SELLER ', foundSeller);
        
    
        if (foundSeller) {
            res.status(400).json(new ApiError(400, 'Email Already Registered As Seller'))
            return
        }
    
        if (foundUser.length == 0) {
            // create new user in database
            const { accessToken, refreshToken } = GenerateTokens(user._id, user.email, 'customer')
            user.refreshToken = refreshToken
            // console.log('User after tokens', user);
            
            const newUser = await new Customer(user)
            await newUser.save()
            // console.log('New User', newUser);
            
            res.cookie('accessToken', accessToken).cookie('_id', ((newUser._id).toHexString())).cookie('profilePicUrl', newUser.profilePicUrl ? newUser.profilePicUrl : '').redirect(config.customerLoginRedirectUrl)
        }
    
        else {
            const existedUser = foundUser[0]
    
            const { accessToken, refreshToken } = GenerateTokens(existedUser._id, existedUser.email, 'customer')
            existedUser.refreshToken = refreshToken
            
            await existedUser.save()
    
            res.cookie('accessToken', accessToken).cookie('_id', ((existedUser._id).toHexString())).cookie('profilePicUrl', existedUser.profilePicUrl ? existedUser.profilePicUrl : '').redirect(config.customerLoginRedirectUrl)
        }
    
        return
    }

    else if (req.query.state == 'seller') {
        // console.log('SELLER REDIRECT CALLED');
        const user = req.user
        
        const foundUser = await Seller.find({'email': user.email})
        const foundCustomer = await Customer.findOne({'email': user.email})
        // console.log('FOUND USER IN CUSTOMER ', foundCustomer);
        // console.log('FOUND USER IN SELLER ', foundUser);
        
        
        if (foundCustomer) {
            res.status(400).json(new ApiError(400, 'Email Already Registered As Customer'))
            return
        }

        if (foundUser.length == 0) {
            // create new user in database
            const { accessToken, refreshToken } = GenerateTokens(user._id, user.email, 'seller')
            user.refreshToken = refreshToken
            // console.log('User after tokens', user);
            
            const newUser = await new Seller(user)
            await newUser.save()
            // console.log('New User', newUser);
            
            res.cookie('accessToken', accessToken).cookie('_id', ((newUser._id).toHexString())).cookie('profilePicUrl', newUser.profilePicUrl ? newUser.profilePicUrl : '').redirect(config.sellerLoginRedirectUrl)
        }

        else {
            const existedUser = foundUser[0]

            const { accessToken, refreshToken } = GenerateTokens(existedUser._id, existedUser.email, 'seller')
            existedUser.refreshToken = refreshToken
            
            await existedUser.save()

            res.cookie('accessToken', accessToken).cookie('_id', ((existedUser._id).toHexString())).cookie('profilePicUrl', existedUser.profilePicUrl ? existedUser.profilePicUrl : '').redirect(config.sellerLoginRedirectUrl)
        }

        return

    }

}

export default GoogleAuthRedirect