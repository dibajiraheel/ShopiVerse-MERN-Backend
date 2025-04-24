import 'dotenv/config'




const config = {
    'PORT': Number(process.env.PORT),
    'mongodbUrl': String(process.env.MONGODB_URL),
    'clientId': String(process.env.CLIENT_ID),
    'clientSecret': String(process.env.CLIENT_SECRET),
    'accessTokenSecret': String(process.env.ACCESS_TOKEN_SECRET),
    'accessTokenExpiry': String(process.env.ACCESS_TOKEN_EXPIRY),
    'refreshTokenSecret': String(process.env.REFRESH_TOKEN_SECRET),
    'refreshTokenExpiry': String(process.env.REFRESH_TOKEN_EXPIRY),
    'customerLoginRedirectUrl': String(process.env.CUSTOMER_LOGIN_REDIRECT_URL),
    'sellerLoginRedirectUrl': String(process.env.SELLER_LOGIN_REDIRECT_URL),
    'appPasswordGmail': String(process.env.APP_PASSWORD_GMAIL),
    'cloudinaryApiKey': String(process.env.CLOUDINARY_API_KEY),
    'cloudinaryApiSecret': String(process.env.CLOUDINARY_API_SECRET),
    'cloudinaryCloudName': String(process.env.CLOUDINARY_CLOUD_NAME)
}


export default config