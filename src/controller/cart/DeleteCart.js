import { ApiError } from "../../utils/ApiError.js"
import Cart from "../../models/Cart.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"




const DeleteCart = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, 'Seller Cannot Delete Item From Cart'))
        return
    }

    const customerId = req.params.customerId

    const foundCart = await Cart.findOne({'customerId': customerId})
    if (foundCart == null) {
        res.status(400).json(new ApiError(400, 'Cart Already Do Not Exist'))
        return
    }

    const response = await foundCart.deleteOne()
    // console.log('CART DELETE RESPONSE', response);

    res.status(200).json(new ApiResponse(200, 'success'))
    return

}




export default DeleteCart


