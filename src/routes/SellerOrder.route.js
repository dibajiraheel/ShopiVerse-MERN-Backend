import Router from "express"
import AsyncHandler from "../utils/AsyncHandler.js"
import AuthenticateUser from "../middlewares/AuthenticateUser.js"
import GetSellerOrder from "../controller/order/seller/GetSellerOrder.js"
import UpdateSellerOrderStatus from "../controller/order/seller/UpdateSellerOrderStatus.js"
import GetDeliveryDetails from "../controller/order/seller/GetDeliveryDetails.js"
import GetSellerOrderInSequence from "../controller/order/seller/GetSellerOrderSequence.js"




const SellerOrderRouter = new Router()


.post('/update-seller-order-status/:sellerOrderId/:isCompleted', AsyncHandler(AuthenticateUser), AsyncHandler(UpdateSellerOrderStatus))

.get('/get-seller-order', AsyncHandler(AuthenticateUser), AsyncHandler(GetSellerOrder))

.get('/get-delivery-details', AsyncHandler(AuthenticateUser), AsyncHandler(GetDeliveryDetails))


// Fetch Seller Order Based On Skip And Limit

.get('/get-seller-order-limited/:skip/:limit', AsyncHandler(AuthenticateUser), AsyncHandler(GetSellerOrderInSequence))






export default SellerOrderRouter



