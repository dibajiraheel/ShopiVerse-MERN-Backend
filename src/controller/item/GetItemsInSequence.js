import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"




const GetItemsInSequence = async (req, res, next) => {
    const sellerId = req.cookies._id
    const skip = req.params.skip
    const limit = req.params.limit

    let totalItems
    if (skip == 0) {
        totalItems = await Item.countDocuments({'sellerId': sellerId})
    }

    const foundItems = await Item.find({'sellerId': sellerId}).skip(skip).limit(limit)
    if (foundItems.length == null) {
        res.status(400).json(new ApiError(400, 'No Item Belong To Given Seller Id'))
        return
    }
    // const allItems = foundItems.map((foundItem) => {
    //     const item = {
    //         itemId: foundItem._id,
    //         itemImage: foundItem.imagesUrls[0],
    //         itemName: foundItem.name,
    //         itemPrice: foundItem.price,
    //         categories: foundItem.categories,
    //         stock: foundItem.stock
    //     }
    //     return item
    // })
    res.status(200).json(new ApiResponse(200, 'success', {allItems: foundItems, totalItems}))
}



export default GetItemsInSequence