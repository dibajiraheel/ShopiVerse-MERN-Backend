import multer from 'multer'
import cloudinary from 'cloudinary'
import config from '../../config.js'
import { ApiError } from '../utils/ApiError.js'
import fs from 'fs'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public')
    },
    filename: function (req, file, cb) {
      cb(null, String(Date.now()) + '.' + (file.originalname.split('.'))[1])
    }
  })
  
  const upload = multer({ storage: storage })


  const CustomerCloudinaryPath = (req, res, next) => {
    req.cloudinaryPath = 'E Commerce/Customer'
    req.uploader = 'customer'
    next()
  }

  const SellerCloudinaryPath = (req, res, next) => {
    req.cloudinaryPath = 'E Commerce/Seller'
    req.uploader = 'seller'
    next()
  }

  const ItemCloudinaryPath = (req, res, next) => {
    req.cloudinaryPath = 'E Commerce/Item'
    next()
  }


  cloudinary.config({ 
  cloud_name: config.cloudinaryCloudName, 
  api_key: config.cloudinaryApiKey, 
  api_secret: config.cloudinaryApiSecret
  });


  const UploadOncloudinary = async (req, res, next) => {
    console.log('REQUEST FILES IN CLUDINARY', req.files);
    
    const fieldNames = Object.keys(req.files)
    const files = req.files  

    const uploadResponses = []
    let uploadErrorOccuredOnFIleNo = 0
    const totalFilesToUpload = fieldNames.length
    for (let i = 0; i < totalFilesToUpload; i++) {
        try {
            const uploadResponse = await cloudinary.v2.uploader.upload(files[fieldNames[i]][0]['path'], {folder: req.cloudinaryPath})
            uploadResponses.push(uploadResponse)
            // console.log('upload response', uploadResponse);
            
        } catch (error) {
            // console.log(`Error occured while uploading ${i + 1} number file`);
            uploadErrorOccuredOnFIleNo = i + 1
            break
        }
    }

    if (uploadErrorOccuredOnFIleNo > 0) {
        for (let i = 0; i < uploadErrorOccuredOnFIleNo; i++) {
            const deleteResponse = await DeleteFIleFromCloudinary(uploadResponses[i]['public_id'])
        }
        res.status(500).json(new ApiError(500, 'Some error occured while uploading files. Please try again later...'))
        return    
    }

    const urls = []
    const publicIds = []
    for (let i = 0; i < totalFilesToUpload; i++) {
        urls.push(uploadResponses[i]['url'])
        // console.log('upload Response', uploadResponses[i]);
        
        publicIds.push(uploadResponses[i]['public_id'])
    }

    req.filesUrls = urls
    req.filesPublicIds = publicIds


    for (let i = 0; i < totalFilesToUpload; i++) {
        const fileName = files[fieldNames[i]][0]['filename']
        console.log('file name to delete', fileName);
        
        fs.unlink(('./src/public/' + fileName), (error) => {
          if (error) {
            // console.log('Error while deleting file from public directory in project', error);
          }
        })
    }


    next()

  }



  const DeleteFIleFromCloudinary = async (publicId) => {
    if (publicId) {
      const deleteResponse = await cloudinary.uploader.destroy(publicId)
      // console.log('Delete Response', deleteResponse);
      // console.log('Delete Response Result', deleteResponse.result);
      return deleteResponse.result
    }
  }



  export { upload, CustomerCloudinaryPath, SellerCloudinaryPath, ItemCloudinaryPath, UploadOncloudinary, DeleteFIleFromCloudinary }