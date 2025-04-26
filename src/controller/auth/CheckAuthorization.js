import { ApiResponse } from "../../utils/ApiResponse.js"



const CheckAuthorization = (req, res, next) => {
    res.status(200).json(new ApiResponse(200, 'success'))
}


export default CheckAuthorization