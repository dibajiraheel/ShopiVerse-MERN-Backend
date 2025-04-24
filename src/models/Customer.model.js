import mongoose from 'mongoose'


const customerSchema = mongoose.Schema({
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
    name: {
        type: String,
        default: ''
    },
    phoneNo: {
        type: Number,
        default: ''
    },
    address: {
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
    },
    signupVia: {
        type: String,
        default: ''
    },
    refreshToken: {
        type: String,
    },
    otp: {
        type: String,
        default: ''
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },

}, {timestamps: true})

const Customer = mongoose.model('Customer', customerSchema)
export default Customer