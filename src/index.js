import express from 'express'
import config from '../config.js'
import cookieParser from 'cookie-parser'
import ConnectDB from './db/ConnectDb.js'
import cors from 'cors'
import passport from 'passport'
import AuthRoute from './routes/Auth.route.js'
import ItemRoute from './routes/Item.route.js'
import ReviewRoute from './routes/Review.route.js'
import CartRoute from './routes/Cart.route.js'
import CustomerOrderRoute from './routes/CustomerOrder.route.js'
import SellerOrderRouter from './routes/SellerOrder.route.js'
import DashboardRoute from './routes/Dashboard.route.js'


const port = config.PORT

const app = express()

//Connect DB
ConnectDB()

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))


app.use(cors({origin: process.env.FRONTEND_LINK, credentials: true}))

app.use(passport.initialize())


//Add Routes
app.use('/auth', AuthRoute)
app.use('/item', ItemRoute)
app.use('/review', ReviewRoute)
app.use('/cart', CartRoute)
app.use('/customer-order', CustomerOrderRoute)
app.use('/seller-order', SellerOrderRouter)
app.use('/dashboard', DashboardRoute)





app.listen(port, () => {



    console.log(`Server listening on port ${port}`);
    console.log('All logs removed updated.....');
    

    
})

