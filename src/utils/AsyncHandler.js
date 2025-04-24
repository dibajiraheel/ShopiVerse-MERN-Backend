import { ApiError } from '../utils/ApiError.js'


const AsyncHandler = (fn) => {
    return (
        async (req, res, next) => {
            try {
                await fn(req, res, next) 
            } catch (error) {
                console.error('Some error occured', error);
                res.status(500).json(new ApiError(500, 'Internal Server Error. Please Try Again'))
                return
            }
        }
    )
}

export default AsyncHandler