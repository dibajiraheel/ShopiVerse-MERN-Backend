import { Router } from "express";
import AsyncHandler from "../utils/AsyncHandler.js";

import { CustomerSignup, CustomerLogin, CustomerLogout } from "../controller/auth/customer/CustomerEmailAuthentication.js";
import CustomerForgetPassword from "../controller/auth/customer/CustomerForgetPassword.js";
import { CustomerVerifyOtp } from "../controller/auth/customer/CustomerVerifyOtp.js";
import CustomerUpdatePassword from "../controller/auth/customer/CustomerUpdatePassword.js";
import { CustomerUserType, SellerUserType } from "../middlewares/AddUserType.js"
import UpdateProfile from "../controller/auth/UpdateProfile.js";
import UploadProfilePic from "../controller/auth/UploadProfilePic.js";

import passport from "../controller/auth/GoogleAuth.js"



import { SellerSignup, SellerLogin, SellerLogout } from "../controller/auth/seller/SellerEmailAuthentication.js";
import SellerForgetPassword from "../controller/auth/seller/SellerForgetPassword.js";
import { SellerVerifyOtp } from "../controller/auth/seller/SellerVerifyOtp.js";
import SellerUpdatePassword from "../controller/auth/seller/SellerUpdatePassword.js";
import { CustomerCloudinaryPath, SellerCloudinaryPath, upload, UploadOncloudinary } from "../middlewares/UploadFile.js";
import GetProfile from "../controller/auth/GetProfile.js";
import AuthenticateUser from "../middlewares/AuthenticateUser.js";
import GoogleAuthRedirect from "../controller/auth/GoogleAuthRedirect.js";


const AuthRoute = Router()

AuthRoute


// Customer
.get('/customer/google', passport.authenticate('google', { state: 'customer', scope: [ 'profile', 'email' ] }))

.post('/customer/signup', AsyncHandler(CustomerSignup))
.post('/customer/login', AsyncHandler(CustomerLogin))
.post('/customer/logout', AsyncHandler(AuthenticateUser), CustomerLogout)
.post ('/customer/forgot-password', AsyncHandler(CustomerForgetPassword))
.post('/customer/verify-otp', AsyncHandler(CustomerVerifyOtp))
.post('/customer/update-password', AsyncHandler(CustomerUpdatePassword))
.post('/customer/update-profile', upload.none(), AsyncHandler(AuthenticateUser), CustomerUserType, AsyncHandler(UpdateProfile))
.post('/customer/upload-profile-pic', AsyncHandler(AuthenticateUser), CustomerCloudinaryPath, upload.fields([{name: 'profilePic'}]), AsyncHandler(UploadOncloudinary), AsyncHandler(UploadProfilePic))

.get('/customer/profile', AsyncHandler(AuthenticateUser), CustomerUserType, AsyncHandler(GetProfile))




.get('/google/redirect', passport.authenticate('google', {session: false}), GoogleAuthRedirect )




// Seller
.get('/seller/google', passport.authenticate('google', { state: 'seller', scope: [ 'profile', 'email' ] }))


.post('/seller/signup', AsyncHandler(SellerSignup))
.post('/seller/login', AsyncHandler(SellerLogin))
.post('/seller/logout', AsyncHandler(AuthenticateUser), SellerLogout)
.post ('/seller/forgot-password', AsyncHandler(SellerForgetPassword))
.post('/seller/verify-otp', AsyncHandler(SellerVerifyOtp))
.post('/seller/update-password', SellerUserType, AsyncHandler(SellerUpdatePassword))
.post('/seller/update-profile', upload.none(), AsyncHandler(AuthenticateUser), SellerUserType, AsyncHandler(UpdateProfile))
.post('/seller/upload-profile-pic', AsyncHandler(AuthenticateUser), SellerCloudinaryPath, upload.fields([{name: 'profilePic'}]), AsyncHandler(UploadOncloudinary), AsyncHandler(UploadProfilePic))

.get('/seller/profile/', AsyncHandler(AuthenticateUser), SellerUserType, AsyncHandler(GetProfile))


export default AuthRoute