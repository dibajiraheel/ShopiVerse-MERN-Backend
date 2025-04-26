import { ApiResponse } from "../../../utils/ApiResponse.js"
import { ApiError } from "../../../utils/ApiError.js"
import SellerOrder from "../../../models/SellerOrder.model.js"


const SellerDashboard = async (req, res, next) => {
    if (req.authUser == 'customer') {
        res.status(400).json(new ApiError(400, 'Customer Cannot Get Seller Dashboard'))
        return
    }

    const sellerId = req.cookies._id
    const days = req.params.days

    const fetchedForXDays = Number(days)

    const allOrders = await SellerOrder.find({'sellerId': sellerId})
    const totalOrders = allOrders.length
    
    const activeOrders = allOrders.filter((order) => order.isCompleted == false || order.isCompleted == 'false')
    // console.log('ACTIVE ORDERS', activeOrders);
    
    const totalActiveOrders = activeOrders.length

    
    const dates = GetLastXDate(days)
    const totalOrdersReceivedInLastXDays = []
    const totalSalesInLastXDays = []
    for (let i = 0; i < days; i++) {
        totalOrdersReceivedInLastXDays.push(0)
        totalSalesInLastXDays.push(0)
    }
    if (allOrders.length > 0) {
        allOrders.map((order) => {
            const orderDate = FormatDate(order.createdAt)
            // console.log('ORDER DATE', orderDate);  
            for (let i = 0; i < days; i++) {
                if (dates[i] == String(orderDate)) {
                    totalOrdersReceivedInLastXDays[i] = Number(totalOrdersReceivedInLastXDays[i]) + 1
                    totalSalesInLastXDays[i] = Number(totalSalesInLastXDays[i]) + Number(order.amount)
                }
            }
        })
    }
    const totalOrdersReceivedToday = totalOrdersReceivedInLastXDays[0]

    const payload = {fetchedForXDays, totalOrders, totalActiveOrders, totalOrdersReceivedInLastXDays, totalSalesInLastXDays, totalOrdersReceivedToday, dates}
    res.status(200).json(new ApiResponse(200, 'success', payload))
    return

}

const FormatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };


const GetLastXDate = (x) => {
    
    const dates = [];
        const today = new Date();
      
        for (let i = 0; i < x; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
      
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
      
          dates.push(`${day}/${month}/${year}`);
        }
        
        return dates;
    
}


export default SellerDashboard



