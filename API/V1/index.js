
// const { orderBy } = require("lodash")
// const { poolPromise, sequelize } = require('../../startup/db')
const timeLimitMiddleware = require('../../middlewares/timeLimitMiddleware')
const validationMiddleware = require('../../middlewares/validationMiddleware')
const { Insert_Order_ValidationRules, FROM_TO_ValidationRules, Product_PageID_ValidationRule } = require('../../Utils/validator')
const authMiddleware = require('../../middlewares/authMiddleware')
const express = require('express')
const router = express.Router()
const params = require('express-params')
params.extend(router);



//---------  Controllers
const ProductController = require('./Controllers/productController')
const CityController = require('./Controllers/cityController')
const OrderController = require('./Controllers/orderController')
const customerController = require('./Controllers/customerController')
const centerController = require('./Controllers/centerController')
const statusController = require('./Controllers/statusController')
const userController = require('./Controllers/userController')





router.get('/products/cat', authMiddleware, ProductController.List_Category_Of_Products)
//router.get('/products/subcat', ProductController.)
router.get('/products', authMiddleware, ProductController.List_Products)
router.get('/products/cat/:catID', authMiddleware, ProductController.List_Products_By_Category)
router.get('/products/cat/:catID/page-:page', Product_PageID_ValidationRule(), [authMiddleware, validationMiddleware], ProductController.List_Products_By_Category_Paginated)
if (process.env.NODE_ENV === 'dev') {
    router.post('/products/bulk', authMiddleware, ProductController.Bulk_Insert_Products)
    router.put('/products/:productID/center/:centerID/mojudi/:input', authMiddleware, ProductController.Set_Mojudi_Kala)
    router.put('/products/:productID/center/:centerID/inc/:input', authMiddleware, ProductController.Increment_Product_Mojudi)
}




router.get('/customers/:customerID', authMiddleware, customerController.Get_Customer_By_ID)
router.get('/customers/city/:cityID', authMiddleware, customerController.List_Customers_By_CityID)
// router.get('/customers/center/:centerID',)
router.get('/customers', authMiddleware, customerController.List_Cutomers)
if (process.env.NODE_ENV === 'dev') {
    router.param('customerID_TFOra', /^[0-9]+$/) // forcing the orderID parameter to be int
    router.put('/customers/:customerID_TFOra', authMiddleware, customerController.Update_Customer_Attributes)
    router.put('/customers/bulk', authMiddleware, customerController.Bulk_Update_Customers)
    router.post('/customers', authMiddleware, customerController.Insert_New_Customer)
    router.post('/customers/bulk', authMiddleware, customerController.Bulk_Insert_Customers)
    router.delete('/customers/:customerID', authMiddleware, customerController.Delete_Customer)
}


router.post('/users/signin', userController.sign_in)
router.post('/users/token', userController.ReNew_Token)
router.get('/users/me', authMiddleware, userController.Me)



router.get('/ostan', CityController.List_Ostans)
router.get('/ostan/:ostanID', CityController.Get_Ostan_By_ID)
router.get('/ostan/:ostanID/cities', CityController.List_Cities_Of_Ostan)
router.get('/city', CityController.List_Cities)
router.get('/city/:cityID', CityController.Get_City_By_ID)



router.post('/orders', Insert_Order_ValidationRules(), [timeLimitMiddleware, authMiddleware, validationMiddleware], OrderController.Save_Order_On_Insert)
router.put('/orders/:orderID', [timeLimitMiddleware,authMiddleware], OrderController.Save_Order_On_Edit)
router.put('/orders/:orderID/setStatus/:statusID', [timeLimitMiddleware, authMiddleware], OrderController.Change_Order_Status)
router.get('/orders/me/from/:FROM/to/:TO', FROM_TO_ValidationRules(), [authMiddleware, validationMiddleware], OrderController.List_MyOrders_From_To)
router.get('/orders/me/today', authMiddleware, OrderController.List_MyOrders_Today)
router.get('/orders/:orderID/details', authMiddleware, OrderController.Get_Details_Of_OrderID)
router.post('/orders/check-products', authMiddleware, OrderController.Inquire_MyCartLines_Price_Quantity_OnInsert)
router.post('/orders/:orderID/check-products', authMiddleware, OrderController.Inquire_MyCartLines_Price_Quantity_OnEdit)
router.post('/orders/Returned', [timeLimitMiddleware, authMiddleware], OrderController.BringBack_Order_Insert)
router.put('/orders/:orderID/Returned', [timeLimitMiddleware,authMiddleware], OrderController.BringBack_Order_Edit)
router.get('/orders/track-code/:trackingCode', authMiddleware, OrderController.Get_Order_By_TrackingCode)
if (process.env.NODE_ENV === 'dev') {
    router.param('orderID', /^[0-9]+$/) // forcing the orderID parameter to be int
    router.get('/orders/:orderID', authMiddleware, OrderController.Get_Order_By_ID)
    router.get('/orders/oraread/:oraRead', authMiddleware, OrderController.List_Orders_ByTIG_OraRead)
    router.get('/orders/:orderID/header', OrderController.Get_Order_Header)
    router.get('/orders/today/details', authMiddleware, OrderController.List_Details_Of_Orders_Today)
    router.get('/orders/from/:FROM/to/:TO/details', FROM_TO_ValidationRules(), validationMiddleware, OrderController.List_Details_Of_Orders_FROM_TO)
    router.get('/orders/from/:FROM/to/:TO', FROM_TO_ValidationRules(), [authMiddleware, validationMiddleware], OrderController.List_Orders_From_To)
    router.put('/orders/:orderID/set/oraread/:bit', [timeLimitMiddleware, authMiddleware], OrderController.Set_OracleRead_Flag)
    router.delete('/orders/:orderID', authMiddleware, OrderController.Delete_Order)
    router.get('/orders/today', authMiddleware, OrderController.List_Orders_Of_Today)
} else {
    router.get('/orders/:orderID/header', authMiddleware, OrderController.Get_Order_Header)
}
// router.post('/orders/test', OrderController.test)



router.get('/status', statusController.List_Status)


router.get('/centers', authMiddleware, centerController.List_All_Centers)
router.get('/centers/:centerID', authMiddleware, centerController.Get_Center_By_ID)
if (process.env.NODE_ENV === 'dev') {
    router.post('/centers', timeLimitMiddleware, centerController.Insert_New_Center)
    router.put('/centers/:centerID', timeLimitMiddleware, centerController.Edit_Center)
    router.post('/centers/bulk', authMiddleware, centerController.Bulk_Insert_Centers)
}






// router.get('/cc1/:id', async (req, res) => {
//   try {
//     const pool = await poolPromise
//     const result = await pool.request()
//       .input('input_parameter', sql.Int, req.params.id)
//       .query('SELECT * FROM [tabarok.ir_hybridsale].[dbo].[V_OstanCity] WHERE OstanID = @input_parameter')

//     res.json(result.recordset)
//   } catch (err) {
//     res.status(500)
//     res.send(err.message)
//   }
// })


// router.get('/cc2/:id', async (req, res) => {
//   try {
//     var city_model = require('../../models/domain/City')(sequelize, DataTypes)
//     await sequelize.authenticate();
//     const r = await city_model.findAll();
//     res.status(200).send(r);
//   } catch (err) {
//     res.status(500)
//     res.send(err.message)
//   }
// })


module.exports = router;