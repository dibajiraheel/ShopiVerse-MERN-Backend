import { DeleteFIleFromCloudinary } from "../../middlewares/UploadFile.js";
import Customer from "../../models/Customer.model.js";
import Seller from "../../models/Seller.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";







const UploadProfilePic = async (req, res, next) => {
    // console.log('Req after cloudinary', req.filesUrls);
    // console.log('Req after cloudinary', req.filesPublicIds)

    const userId = req.cookies._id
    // console.log('user id', userId);
    
    if (req.uploader == 'customer') {
        // console.log('CUSTOMER CALLED');
        
        const foundUser = await Customer.findOne({'_id': userId})
        // console.log('USER FOUND', foundUser);
        
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'invalid User id'))
            return
        }

        if (foundUser.profilePicUrl != '') {
            const deleteResponse = await DeleteFIleFromCloudinary(foundUser.profilePicPublicId)
            // console.log('Delete Response got', deleteResponse);
        }
        
        foundUser.profilePicUrl = req.filesUrls[0]
        foundUser.profilePicPublicId = req.filesPublicIds[0]
        await foundUser.save()
        // console.log('User After Adding New Profile Pic', foundUser);
        res.cookie('profilePicUrl', req.filesUrls[0]).status(200).json(new ApiResponse(200, 'success'))
        return
    }


    else if (req.uploader == 'seller') {
        const foundUser = await Seller.findOne({'_id': userId})
        if (foundUser == null) {
            res.status(400).json(new ApiError(400, 'invalid User id'))
            return
        }

        if (foundUser.profilePicUrl != '') {
            const deleteResponse = await DeleteFIleFromCloudinary(foundUser.profilePicPublicId)
            // console.log('Delete Response got', deleteResponse);
        }
        
        foundUser.profilePicUrl = req.filesUrls[0]
        foundUser.profilePicPublicId = req.filesPublicIds[0]
        await foundUser.save()
        // console.log('User After Adding New Profile Pic', foundUser);
        res.cookie('profilePicUrl', req.filesUrls[0], {httpOnly: false, sameSite: 'None', secure: true}).status(200).json(new ApiResponse(200, 'success'))
        return
        
    }
    
}


export default UploadProfilePic