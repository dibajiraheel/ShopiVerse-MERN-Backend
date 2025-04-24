import Cart from "../../models/Cart.model.js"
import Item from "../../models/Item.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"





const AddItemInCart = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, "Seller Cannot Place Order"))
        return
    }

    const customerId = req.params.customerId
    const itemid = req.params.itemId
    const itemQuantity = req.params.itemQuantity
    
    const foundItem = await Item.findOne({'_id': itemid})
    if (foundItem == null) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }

    const itemName = foundItem.name
    const itemPrice = foundItem.price
    const itemImage = foundItem.imagesUrls[0]
    const sellerId = foundItem.sellerId

    const itemToAdd = {
        'itemId': itemid,
        'sellerId': sellerId,
        'itemName': itemName,
        'itemPrice': itemPrice,
        'itemImage': itemImage,
        'itemQuantity': itemQuantity,
        'totalPrice': Number(itemQuantity) * Number(itemPrice),
    }


    const foundCart = await Cart.findOne({'customerId': customerId})
    if (foundCart != null) {

        const currentItems = foundCart.items
        const currentAmount = foundCart.amount
        
        
        // if item is already present in cart 

        let updatedAmount
        let itemAvailableAtIndex = -1
        const noOfItemsInCart = currentItems.length
        for (let i = 0; i < noOfItemsInCart; i++) {
            if (currentItems[i].itemId == itemid) {
                itemAvailableAtIndex = i
                break
            }
        }

        if (itemAvailableAtIndex != -1) {
            const currentQuantity = currentItems[itemAvailableAtIndex].itemQuantity
            const currentTotalPrice = currentItems[itemAvailableAtIndex].totalPrice

            currentItems[itemAvailableAtIndex].itemQuantity = Number(currentQuantity) + Number(itemQuantity)
            currentItems[itemAvailableAtIndex].totalPrice = Number(currentTotalPrice) + ( Number(itemQuantity) * Number(itemPrice) )

            updatedAmount = Number(currentAmount) + Number(itemQuantity * itemPrice)

            foundCart.items = currentItems
            foundCart.amount = updatedAmount
            await foundCart.save()

            console.log('CART AFTER ADDING ITEM', foundCart);

            res.status(200).json(new ApiResponse(200, 'success'))
            return

        }



        currentItems.push(itemToAdd)

        foundCart.items = currentItems
        foundCart.amount = Number(currentAmount) + ( Number(itemPrice)* Number(itemQuantity) )
        

        await foundCart.save()

        console.log('CART AFTER ADDING ITEM', foundCart);

        res.status(200).json(new ApiResponse(200, 'success'))
        return
        
    }


    const newCart = new Cart()

    newCart.customerId = customerId
    newCart.amount = Number(itemQuantity) * Number(itemPrice)
    newCart.items = [itemToAdd]

    await newCart.save()

    res.status(200).json(new ApiResponse(200, 'success'))
    return

    
}




export default AddItemInCart



