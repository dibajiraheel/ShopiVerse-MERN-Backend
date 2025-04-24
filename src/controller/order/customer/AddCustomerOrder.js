import CustomerOrder from "../../../models/CustomerOrder.model.js"
import SellerOrder from "../../../models/SellerOrder.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"
import Cart from "../../../models/Cart.model.js"
import Item from "../../../models/Item.model.js"




const AddCustomerOrder = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, 'Seller Cannot Place Order'))
        return
    }
    
    const customerId = req.params.customerId
    const foundCart = await Cart.findOne({'customerId': customerId})
    if (foundCart == null) {
        res.status(400).json(new ApiError(400, 'No Item In Customer Cart to place order'))
        return
    }


    const customerOrder = new CustomerOrder()
    customerOrder.customerId = customerId
    customerOrder.amount = foundCart.amount
    customerOrder.items = foundCart.items
    await customerOrder.save()


    // Update Items Sold In Item Model
    const noOfItems = (customerOrder.items).length
    for (let i = 0; i < noOfItems; i++) {
        const item = (customerOrder.items)[i]
        const foundItem = await Item.findOne({'_id': item.itemId})
        foundItem.sold = Number(foundItem.sold) + Number(item.itemQuantity)
        await foundItem.save()
    }

    // Send Order To Seller by adding item to seller order mode
    
    const totalItems = foundCart.items
    const totalItemsInOrder = foundCart.items.length

    for (let i = 0; i < totalItemsInOrder; i++) {
        const currentItem = totalItems[i]

        const customerOrderId = customerOrder._id
        const sellerId = currentItem.sellerId
        const itemName = currentItem.itemName
        const itemPrice = currentItem.itemPrice
        const itemImage = currentItem.itemImage
        const itemQuantity = currentItem.itemQuantity
        const amount = currentItem.totalPrice
        const itemId = currentItem.itemId

        const sellerOrderToAdd = {
            customerOrderId,
            customerId,
            sellerId,
            itemId,
            itemName,
            itemPrice,
            itemImage,
            itemQuantity,
            amount
        }

        const newSellerOrder = new SellerOrder(sellerOrderToAdd)
        await newSellerOrder.save()

        
    }
    
    // Delete Cart Of Customer

    await foundCart.deleteOne()

    res.status(200).json(new ApiResponse(200, 'success', {newOrder: customerOrder}))
    return
   

}





export default AddCustomerOrder