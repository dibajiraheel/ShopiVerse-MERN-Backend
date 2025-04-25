import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"




const GetItem = async (req, res, next) => {
    const itemId = req.params.itemId
    // console.log('ITEM ID FOUND TO FIND ITEM', itemId);
    
    const foundItem = await Item.findOne({'_id': itemId})
    if (foundItem == null) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }
    res.status(200).json(new ApiResponse(200, 'success', foundItem))
}



export default GetItem