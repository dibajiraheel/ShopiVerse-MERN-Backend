import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { DeleteFIleFromCloudinary } from "../../middlewares/UploadFile.js"





const DeleteItem = async (req, res, next) => {

    if (req.role == 'customer') {
        res.status(400).json(new ApiError(400, 'Customer Cannot Add Item'))
        return
    }

    const itemId = req.params.itemId

    const foundItem = await Item.findOne({'_id': itemId})
    if (foundItem == null) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }

    if (foundItem.sellerId != req.cookies._id) {
        res.status(400).json(new ApiError(400, "This Seller Is Not Owner Of This Item"))
        return
    }

    const currentPublicIds = foundItem.publicIds
    const noOfCurrentPublicIds = currentPublicIds.length
    if (noOfCurrentPublicIds > 0) {
        for (let i = 0; i < noOfCurrentPublicIds; i++) {
            await DeleteFIleFromCloudinary(currentPublicIds[i])
        }
    }


    const response = await foundItem.deleteOne()
    // console.log('DELETE RESPONSE', response);
    
    res.status(200).json(new ApiResponse(200, 'Item Deleted Successfully'))
    return

}


export { DeleteItem }