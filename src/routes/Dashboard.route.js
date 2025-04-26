import Router from "express"
import AsyncHandler from "../utils/AsyncHandler.js"
import AuthenticateUser from "../middlewares/AuthenticateUser.js"
import SellerDashboard from "../controller/dashboard/seller/SellerDashboard.js"



const DashboardRoute = Router()



DashboardRoute

.get('/seller/:days', AsyncHandler(AuthenticateUser), AsyncHandler(SellerDashboard))





export default DashboardRoute