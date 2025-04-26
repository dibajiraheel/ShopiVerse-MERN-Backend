import { ApiError } from "../../utils/ApiError.js"
import Cart from "../../models/Cart.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"




const DeleteItemFromCart = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, 'Seller Cannot Delete Item From Cart'))
        return
    }

    const itemId = req.params.itemId
    const customerId = req.cookies._id

    const foundCart = await Cart.findOne({'customerId': customerId})
    if (foundCart == null) {
        res.status(400).json(new ApiError(400, 'Cart Is Already Empty'))
        return
    }

    const items = foundCart.items
    const totalItems = items.length

    let isItemFound = false
    let itemQuantity
    let itemPrice
    for (let i = 0; i < totalItems; i++) {
        const currentItem = items[i]
        if (currentItem.itemId == itemId) {
            isItemFound = true
            itemQuantity = currentItem.itemQuantity
            itemPrice = currentItem.itemPrice
            break
        }
    }

    if (!isItemFound) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }

    const filteredItems = items.filter((item) => item.itemId != itemId)

    foundCart.items = filteredItems
    foundCart.amount = Number(foundCart.amount) - (Number(itemQuantity) * Number(itemPrice))
    await foundCart.save()
    res.status(200).json(new ApiResponse(200, 'success'))
    return


}




export default DeleteItemFromCart