import Review from "../../models/Review.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"



const DeleteReview = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, "Seller Cannot Review Item"))
        return
    }

    const itemId = req.params.itemId
    const reviewId = req.params.reviewId
    const customerId = req.cookies._id

    const foundReview = await Review.findOne({'itemId': itemId})

    if (foundReview == null) {
        res.status(400).json(new ApiError(400, 'Invalid Item Id'))
        return
    }

    const interactions = foundReview.interaction
    
    const filteredInteractions = interactions.filter((interaction) => !(interaction.customerId == customerId && interaction._id == reviewId))

    foundReview.interaction = filteredInteractions

    await foundReview.save()

    // console.log('Review After Deletion', foundReview);

    res.status(200).json(new ApiResponse(200, "success"))

    return

}



export default DeleteReview






