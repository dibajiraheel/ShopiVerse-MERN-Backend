import Item from "../../models/Item.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"





const GetAllItemsInSequenceForCustomer = async (req, res, next) => {

    const skip = req.params.skip
    const limit = req.params.limit

    let totalItems
    if (skip == 0) {
        totalItems = await Item.countDocuments()
    }
    const items = await Item.find().skip(skip).limit(limit)
    const responseData = {items, totalItems}

    res.status(200).json(new ApiResponse(200, 'success', responseData))
    return

}




export default GetAllItemsInSequenceForCustomer


