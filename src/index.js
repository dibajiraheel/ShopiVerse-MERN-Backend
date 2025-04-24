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


const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.0.100:5173', // replace with your actual IP
  ];
  
app.use(cors({
origin: function (origin, callback) {
    // console.log('ORIGIN RECEIVED...', origin);
    // console.log('INCLUDED', allowedOrigins.includes(origin));
    
    if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
    } else {
    callback(new Error('Not allowed by CORS'));
    }
},
credentials: true,
}));


// app.use(cors({origin: "http://localhost:5173", credentials: true}))

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
    
})

