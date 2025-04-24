import { ApiError } from "../../utils/ApiError.js"
import Review from "../../models/Review.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"




const GetItemReview = async (req, res, next) => {
    
    const itemId = req.params.itemId

    const foundReviews = await Review.find({'itemId': itemId})
    if (foundReviews.length == 0) {
        res.status(200).json(new ApiResponse(200, 'success', []))
        return
    }

    res.status(200).json(new ApiResponse(200, 'success', foundReviews))
    return

}


export default GetItemReview