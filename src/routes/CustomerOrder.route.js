import Router from 'express'
import AsyncHandler from '../utils/AsyncHandler.js'
import AuthenticateUser from '../middlewares/AuthenticateUser.js'
import AddCustomerOrder from '../controller/order/customer/AddCustomerOrder.js'
import GetCustomerOrder from '../controller/order/customer/GetCustomerOrder.js'



const CustomerOrderRoute = Router()


CustomerOrderRoute

.post('/add-customer-order', AsyncHandler(AuthenticateUser), AsyncHandler(AddCustomerOrder))

.get('/get-customer-order/:skip/:limit', AsyncHandler(AuthenticateUser), AsyncHandler(GetCustomerOrder))


export default CustomerOrderRoute


