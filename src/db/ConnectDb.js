import mongoose from 'mongoose'
import config from '../../config.js'


const ConnectDB = async () => {
    const mongodbUrl = config.mongodbUrl
    
    try {
        const response = await mongoose.connect(mongodbUrl)
        console.log('DB Conneced Successfully...');
        // console.log(response);
    } catch (error) {
        console.error('MONGODB Connection Error in ConnectDb.js', error);
    }
    
}

export default ConnectDB