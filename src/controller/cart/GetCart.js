import Cart from "../../models/Cart.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"





const GetCart = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, 'Seller Cannot Have Any Cart'))
        return
    }

    const customerid = req.params.customerId
    // console.log('CUSTOMER ID TO FIND CART', customerid);
    // console.log('PARAMS FOUND', req.params);
    
    const foundCart = await Cart.findOne({'customerId': customerid})
    if (foundCart == null) {
        res.status(400).json(new ApiError(400, 'User Do Not Have Any Cart'))
        return
    }

    res.status(200).json(new ApiResponse(200, 'success', foundCart))
    return

}




export default GetCart




