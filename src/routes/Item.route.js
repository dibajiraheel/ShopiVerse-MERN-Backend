import { Router } from "express";
import AuthenticateUser from "../middlewares/AuthenticateUser.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import AddItem from "../controller/item/AddItem.js";
import { ItemCloudinaryPath, upload , UploadOncloudinary } from "../middlewares/UploadFile.js"
import { UpdateItemBio, UpdateItemImages } from "../controller/item/UpdateItem.js";
import { DeleteItem } from "../controller/item/DeleteItem.js";
import GetItem from "../controller/item/GetItem.js";
import GetAllItems from "../controller/item/GetAllItems.js";
import IncreaseItemStock from "../controller/item/IncreaseItemStock.js";
import DecreaseItemStock from "../controller/item/DecreaseItemStock.js";
import GetItemsInSequence from "../controller/item/GetItemsInSequence.js";
import GetAllItemsInSequenceForCustomer from "../controller/item/GetAllItemsInSequenceForCustomer.js"


const ItemRoute = Router()


ItemRoute
.post('/add-item', AsyncHandler(AuthenticateUser), ItemCloudinaryPath, upload.fields([{name: 'imageOne'}, {name: 'imageTwo'}]), AsyncHandler(UploadOncloudinary),  AsyncHandler(AddItem))

.post('/update-item-bio/:itemId', upload.none(), AsyncHandler(AuthenticateUser), AsyncHandler(UpdateItemBio))

.post('/update-item-images/:itemId', AsyncHandler(AuthenticateUser), ItemCloudinaryPath, upload.fields([{name: 'imageOne'}, {name: 'imageTwo'}]), AsyncHandler(UploadOncloudinary), AsyncHandler(UpdateItemImages))

.post('/increase-item-stock/:itemId/:addMore', AsyncHandler(AuthenticateUser), AsyncHandler(IncreaseItemStock))

.post('/decrease-item-stock/:itemId/:decreaseBy', AsyncHandler(AuthenticateUser), AsyncHandler(DecreaseItemStock))

.delete('/delete-item/:itemId', AsyncHandler(AuthenticateUser), AsyncHandler(DeleteItem))

.get('/get-item/:itemId', AsyncHandler(AuthenticateUser), AsyncHandler(GetItem))

.get('/get-all-items', AsyncHandler(AuthenticateUser), AsyncHandler(GetAllItems))


// Pagination

.get('/get-items/:skip/:limit', AsyncHandler(AuthenticateUser), AsyncHandler(GetItemsInSequence))

.get('/get-items-for-customer/:skip/:limit', AsyncHandler(AuthenticateUser), AsyncHandler(GetAllItemsInSequenceForCustomer))


export default ItemRoute




