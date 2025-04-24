import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"





const IncreaseItemStock = async (req, res, next) => {

    const itemId = req.params.itemId
    const addMore = req.params.addMore

    const foundItem = await Item.findOne({'_id': itemId})
    if (foundItem == null) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }

    foundItem.stock = Number(foundItem.stock) + Number(addMore)
    await foundItem.save()
    
    res.status(200).json(new ApiResponse(200, 'success'))

    return

}


export default IncreaseItemStock