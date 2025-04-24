import SellerOrder from "../../../models/SellerOrder.model.js"
import { ApiError } from "../../../utils/ApiError.js"
import { ApiResponse } from "../../../utils/ApiResponse.js"
import CustomerOrder from "../../../models/CustomerOrder.model.js"





const UpdateSellerOrderStatus = async (req, res, next) => {
    if (req.role == 'customer') {
        res.status(400).json(new ApiError(400, 'Customer Cannot Update Seller Order Status'))
        return
    }

    const sellerOrderId = req.params.sellerOrderId
    const sellerId = req.params.sellerId
    const isCompleted = req.params.isCompleted

    const sellerOrder = await SellerOrder.findOne({'_id': sellerOrderId})
    if (sellerOrder == null) {
        res.status(400).json(new ApiError(400, 'Invalid Seller Order Id'))
        return
    }

    if (sellerOrder.sellerId != sellerId) {
        res.status(400).json(new ApiError(400, 'Seller Order Do Not Belong To This Seller Id'))
        return
    }

    sellerOrder.isCompleted = isCompleted
    await sellerOrder.save()


    // update order status in customer order

    const customerOrder = await CustomerOrder.findOne({'_id': sellerOrder.customerOrderId})
    if (customerOrder == null) {
        res.status(400).json(new ApiError(400, 'Customer Order Not Found'))
        return
    }

    const items = customerOrder.items
    const updatedItems = items.map((item) => {
        if (item.itemId == sellerOrder.itemId) {
            return {...item, isCompleted: sellerOrder.isCompleted}
        }
        return item
    })

    customerOrder.items = updatedItems

    let allItemsCompleted = true
    for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].isCompleted == false || updatedItems[i].isCompleted == 'false') {
            allItemsCompleted = false
        }
    }

    if (allItemsCompleted) {
        customerOrder.isCompleted = true
    }
    else if (!allItemsCompleted) {
        customerOrder.isCompleted = false
    }
    
    await customerOrder.save()

    res.status(200).json(new ApiResponse(200,'success'))
    return

}





export default UpdateSellerOrderStatus




