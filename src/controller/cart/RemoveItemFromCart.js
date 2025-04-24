import Cart from "../../models/Cart.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"



const RemoveItemFromCart = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, 'Seller Cannot Remove Item From Cart'))
        return
    }

    const itemId = req.params.itemId
    const customerId = req.params.customerId
    const quantityToKeep = Number(req.params.quantityToKeep)

    const foundCart = await Cart.findOne({'customerId': customerId})
    if (foundCart == null) {
        res.status(400).json(new ApiError(400, 'Cart Is Already Empty'))
        return
    }

    const items = foundCart.items
    const totalItems = items.length

    let isItemUpdated = false
    for (let i = 0; i < totalItems; i++) {
        const currentItem = items[i]
        if (currentItem.itemId == itemId) {
            isItemUpdated = true
            if (currentItem.itemQuantity == quantityToKeep) {
                res.status(200).json(new ApiResponse(200, 'success'))
                return
            }
            else if (currentItem.itemQuantity > quantityToKeep) {
                const excessQuantity = Number(currentItem.itemQuantity) - quantityToKeep
                currentItem.itemQuantity = quantityToKeep
                currentItem.totalPrice = Number(currentItem.totalPrice) - (excessQuantity * currentItem.itemPrice)
                foundCart.amount = Number(foundCart.amount) - (excessQuantity * currentItem.itemPrice)
            }
            break
        }
    }

    if (!isItemUpdated) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }

    foundCart.items = items
    await foundCart.save()
    res.status(200).json(new ApiResponse(200, 'success'))
    return

}


export default RemoveItemFromCart

