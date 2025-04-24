import mongoose from "mongoose";





const CartSchema = new mongoose.Schema({
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
            sellerId: {
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
                required: true,
                default: 1
            },
            totalPrice: {
                type: Number,
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

}, {timestamps: true})



const Cart = mongoose.model('Cart', CartSchema)

export default Cart







