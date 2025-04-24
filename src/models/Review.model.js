import mongoose from "mongoose";



const ReviewSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },
    interaction: {
        type: [{
            customerId: {
                type: String,
                required: true
            },
            review: {
                type: String,
            },
            rating: {
                type: Number
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }],
        default: []
    }
}, {timestamps: true})


const Review = mongoose.model('Review', ReviewSchema)

export default Review