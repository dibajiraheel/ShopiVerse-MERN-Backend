import mongoose, { mongo } from "mongoose";





const CustomerOrderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    items: {
        type: [{
            itemId: {
                type: String,
                required: true
            },
            itemName: {
                type: String,
                required: true
            },
            itemImage: {
                type: String,
                required: true
            },
            itemPrice: {
                type: Number,
                required: true
            },
            itemQuantity: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            },
            sellerId: {
                type: String,
                required: true
            },
            isCompleted: {
                type: Boolean,
                required: true,
                default: false
            },
            createdAt: {
                type: String,
                default: Date.now()
            }
        }]
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }

}, {timestamps: true})



const CustomerOrder = mongoose.model('CustomerOrder', CustomerOrderSchema)


export default CustomerOrder



