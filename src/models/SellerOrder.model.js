import mongoose from "mongoose";




const SellerOrderSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        required: true
    },
    customerOrderId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
    
}, {timestamps: true})



const SellerOrder = mongoose.model('SellerOrder', SellerOrderSchema)



export default SellerOrder



