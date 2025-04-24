import mongoose from "mongoose";


const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagesUrls: {
        type: [String],
        required: true
    },
    publicIds: {
        type: [String],
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    sellerId: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        required: true
    }

}, {timestamps: true})


const Item = mongoose.model('Item', ItemSchema)
export default Item

