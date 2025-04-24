import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"



const AddItem = async (req, res, next) => {
    
    if (req.role == 'customer') {
        res.status(400).json(new ApiError(400, 'Customer Cannot Add Item'))
        return
    }

    const data = req.body

    if (!(data.name && data.price && data.stock && data.categories)){
        res.status(400).json(new ApiError(400, 'Atleast Send Item Name, Price, Stock, Categories, Two Images.'))
        return
    }

    const newItem = new Item()
    newItem.name = data.name
    newItem.price = data.price
    newItem.sellerId = req.cookies._id
    newItem.stock = data.stock
    newItem.categories = data.categories
    newItem.imagesUrls = req.filesUrls
    newItem.publicIds = req.filesPublicIds
    if(data?.description) {
        newItem.description = data.description
    }

    await newItem.save()
    console.log('ITEM ADDED IS', newItem);
    
    res.status(200).json(new ApiResponse(200, 'Item Added Successfully', newItem))
    
}


export default AddItem