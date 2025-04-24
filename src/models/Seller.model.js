import mongoose from "mongoose";



const sellerSchema = new mongoose.Schema({
    userName:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String
    },
    profilePicUrl:{
        type: String,
        default: ''
    },
    profilePicPublicId:{
        type: String
    },
    phoneNo:{
        type: Number,
        default: ''
    },
    address:{
        type: String,
        default: ''
    },
    signupVia:{
        type: String
    },
    refreshToken:{
        type: String
    },
    otp:{
        type: String,
        default: ''
    },
    isOtpVerified:{
        type: Boolean,
        default: false
    },
    cnic: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    }

}, {timestamps: true})


const Seller = mongoose.model('Seller', sellerSchema)
export default Seller






