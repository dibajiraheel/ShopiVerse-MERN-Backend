import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"





const DecreaseItemStock = async (req, res, next) => {

    const itemId = req.params.itemId
    const decreaseBy = req.params.decreaseBy

    const foundItem = await Item.findOne({'_id': itemId})
    if (foundItem == null) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }

    if (Number(foundItem.stock) < Number(decreaseBy)) {
        foundItem.stock = 0
    }

    else {
        foundItem.stock = Number(foundItem.stock) - Number(decreaseBy)
    }

    await foundItem.save()
    
    res.status(200).json(new ApiResponse(200, 'success'))

    return

}


export default DecreaseItemStock