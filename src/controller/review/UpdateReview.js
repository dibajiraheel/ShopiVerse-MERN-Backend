import { ApiError } from "../../utils/ApiError.js"
import Review from "../../models/Review.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const UpdateReview = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, "Seller Cannot Review Item"))
        return
    }
    const customerId = req.params.customerId
    const itemId = req.params.itemId
    const reviewId = req.params.reviewId
    const data = req.body
    // console.log('REVIEW DATA RECEIVED IN UPDATE REVIEW HANDLER', data);
    
    const foundReview = await Review.findOne({'itemId': itemId})
    if (foundReview == null) {
        res.status(400).json(new ApiError(400, "Invalid Item Id"))
        return
    }

    const interactions = foundReview.interaction
    const noOfInteractions = interactions.length

    let isInteractionUpdated = false
    for (let i = 0; i < noOfInteractions; i++) {
        if (interactions[i]._id == reviewId) {
            // console.log('Interaction found', interactions[i]);
            // console.log('Interaction found at index', i);
            interactions[i].review = data.review
            interactions[i].rating = data.rating
            // console.log('Interaction after update', interactions[i]);
            isInteractionUpdated = true
            break
        }        
    }

    if (!isInteractionUpdated) {
        res.status(400).json(new ApiError(400, "Invalid Review Id"))
        return
    }

    foundReview.interaction = interactions
    await foundReview.save()

    res.status(200).json(new ApiResponse(200, 'success'))
    return
}


export default UpdateReview