import Router from "express"
import AsyncHandler from "../utils/AsyncHandler.js"
import AuthenticateUser from "../middlewares/AuthenticateUser.js"
import AddItemInCart from "../controller/cart/AddItemInCart.js"
import GetCart from "../controller/cart/GetCart.js"
import RemoveItemFromCart from "../controller/cart/RemoveItemFromCart.js"
import DeleteItemFromCart from "../controller/cart/DeleteItemFromCart.js"
import DeleteCart from "../controller/cart/DeleteCart.js"


const CartRoute = Router()


CartRoute

.post('/add-item-in-cart/:itemId/:itemQuantity', AsyncHandler(AuthenticateUser), AsyncHandler(AddItemInCart))
.post('/remove-item-from-cart/:itemId/:quantityToKeep', AsyncHandler(AuthenticateUser), AsyncHandler(RemoveItemFromCart))
.delete('/delete-item-from-cart/:itemId', AsyncHandler(AuthenticateUser), AsyncHandler(DeleteItemFromCart))
.delete('/delete-cart', AsyncHandler(AuthenticateUser), AsyncHandler(DeleteCart))

.get('/get-cart', AsyncHandler(AuthenticateUser), AsyncHandler(GetCart))





export default CartRoute