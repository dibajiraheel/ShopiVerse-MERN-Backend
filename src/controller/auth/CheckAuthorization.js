import { ApiResponse } from "../../utils/ApiResponse.js"



const CheckAuthorization = (req, res, next) => {
    // console.log('REQ PROFIEL PIC URL', req.profilePicUrl);
    
    res.status(200).json(new ApiResponse(200, 'success', {profilePicUrl: req.profilePicUrl}))
}


export default CheckAuthorization