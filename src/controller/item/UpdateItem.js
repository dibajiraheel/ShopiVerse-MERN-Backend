import { DeleteFIleFromCloudinary } from "../../middlewares/UploadFile.js"
import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"



const UpdateItemBio = async (req, res, next) => {
    
    if (req.role == 'customer') {
        res.status(400).json(new ApiError(400, 'Customer Cannot Add Item'))
        return
    }

    const data = req.body
    // console.log('DATA RECEIVED', req.body);
    
    const itemId = req.params.itemId
    // console.log('Item id received in update item function in backend', itemId);

    const foundItem = await Item.findOne({'_id': itemId})
    if (foundItem == null) {
        res.status(400).json(new ApiError(400, "Invalid Item Id"))
        return
    }

    if (foundItem.sellerId != req.cookies._id) {
        res.status(400).json(new ApiError(400, "This Seller Is Not Owner Of This Item"))
        return
    }

    // console.log('UPDATE DATA RECEIVED', data);
    
    foundItem.name = data.name
    foundItem.price = data.price
    foundItem.stock = data.stock
    foundItem.categories = data.categories
    if (data?.description != '') {
        foundItem.description = data.description
    }
    
    await foundItem.save()

    res.status(200).json(new ApiResponse(200, 'Item Updated Successfully'))
    return

}


const UpdateItemImages = async (req, res, next) => {

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
    
    foundItem.imagesUrls = req.filesUrls
    foundItem.publicIds = req.filesPublicIds
    await foundItem.save()

    res.status(200).json(new ApiResponse(200, 'Images Updated Successfully', {imageOneUrl: req.filesUrls[0], imageTwoUrl: req.filesUrls[1]}))

}


export { UpdateItemBio, UpdateItemImages }