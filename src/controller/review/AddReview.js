import Review from "../../models/Review.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"




const AddReview = async (req, res, next) => {
    if (req.role == 'seller') {
        res.status(400).json(new ApiError(400, "Seller Cannot Review Item"))
        return
    }
    const customerId = req.cookies._id
    const itemId = req.params.itemId
    const data = req.body
    // console.log('REVIEW DATA RECEIVED IN ADD REVIEW HANDLER', data);
    

    const foundReview = await Review.findOne({'itemId': itemId})
    if (foundReview == null) {
        const newReview = new Review()
        // console.log('New Created Review', newReview);

        newReview.itemId = itemId
        
        const newInteraction = {'customerId': customerId, 'review': data.review, 'rating': data.rating}
        newReview.interaction.push(newInteraction)

        await newReview.save()
        // console.log('New Review Finalized', newReview);
        
        const updatedInteractions = newReview.interaction
        const totalUpdatedInteractions = updatedInteractions.length
        const recentlyAddedInteraction = updatedInteractions[totalUpdatedInteractions - 1]
        const recentlyAddedReviewId = recentlyAddedInteraction._id
    
        res.status(200).json(new ApiResponse(200, "success", {newReviewId: recentlyAddedReviewId}))
        return
    }

    const newInteraction = {'customerId': customerId, 'review': data.review, 'rating': data.rating}
    foundReview.interaction.push(newInteraction)
    await foundReview.save()

    const updatedInteractions = foundReview.interaction
    const totalUpdatedInteractions = updatedInteractions.length
    const recentlyAddedInteraction = updatedInteractions[totalUpdatedInteractions - 1]
    const recentlyAddedReviewId = recentlyAddedInteraction._id

    res.status(200).json(new ApiResponse(200, "success", {newReviewId: recentlyAddedReviewId}))
    return

}


export default AddReview






