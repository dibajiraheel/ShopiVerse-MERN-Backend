import Router from "express"
import AuthenticateUser from "../middlewares/AuthenticateUser.js"
import AsyncHandler from "../utils/AsyncHandler.js"
import AddReview from "../controller/review/AddReview.js"
import UpdateReview from "../controller/review/UpdateReview.js"
import DeleteReview from "../controller/review/DeleteReview.js"
import GetItemReview from "../controller/review/GetItemReview.js"
import { upload } from "../middlewares/UploadFile.js"

const ReviewRoute = Router()


ReviewRoute

.post('/add-review/:itemId/:customerId', upload.none(), AsyncHandler(AuthenticateUser), AsyncHandler(AddReview))
.post('/update-review/:itemId/:customerId/:reviewId',upload.none() , AsyncHandler(AuthenticateUser), AsyncHandler(UpdateReview))
.delete('/delete-review/:itemId/:customerId/:reviewId', AsyncHandler(AuthenticateUser), AsyncHandler(DeleteReview))

.get('/get-review/:itemId', AsyncHandler(AuthenticateUser), AsyncHandler(GetItemReview))


export default ReviewRoute




