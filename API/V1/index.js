const { DataTypes } = require("sequelize")
const { poolPromise, sequelize } = require('../../startup/db')
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





router.get('/products/cat', ProductController.List_Category_Of_Products)
//router.get('/products/subcat', ProductController.)
router.get('/products', ProductController.List_Products)
router.get('/products/cat/:catID', ProductController.List_Products_By_Category)
router.get('/products/cat/:catID/page-:page', ProductController.List_Products_By_Category_Paginated)
//router.get('/products/eager', ProductController.Simple_Select_EagerLoad)
router.post('/products/bulk', ProductController.Bulk_Insert_Products)



//router.get('/customers', customerController.List_Cutomers)
router.get('/customers/:customerID', customerController.Get_Customer_By_ID)
router.param('customerID_TFOra', /^[0-9]+$/) // forcing the orderID parameter to be int
router.put('/customers/:customerID_TFOra', customerController.Update_Customer_Attributes)
router.put('/customers/bulk', customerController.Bulk_Update_Customers)
router.get('/customers/city/:cityID', customerController.List_Customers_By_CityID)
router.get('/customers/center/:centerID', )
router.post('/customers', customerController.Insert_New_Customer)
router.post('/customers/bulk', customerController.Bulk_Insert_Customers)




router.get('/ostan', CityController.List_Ostans)
router.get('/ostan/:ostanID', CityController.Get_Ostan_By_ID)
router.get('/ostan/:ostanID/cities', CityController.List_Cities_Of_Ostan)
router.get('/city', CityController.List_Cities)
router.get('/city/:cityID', CityController.Get_City_By_ID)



router.post('/orders', OrderController.Save_Order_On_Insert)
router.param('orderID', /^[0-9]+$/) // forcing the orderID parameter to be int
router.get('/orders/:orderID', OrderController.Get_Order_By_ID)
router.get('/orders/today', OrderController.List_Orders_Of_Today)
router.get('/orders/from/:FROM/to/:TO', OrderController.List_Orders_From_To)
router.get('/orders/oraread/:oraRead', OrderController.List_Orders_ByTIG_OraRead)
router.put('/orders/:orderID/set/oraread/:bit', OrderController.Set_OracleRead_Flag)
router.put('/orders/:orderID/setStatus/:statusID', OrderController.Change_Order_Status)



router.get('/centers', centerController.List_All_Centers)
router.get('/centers/:centerID', centerController.Get_Center_By_ID)
router.post('/centers', centerController.Insert_New_Center)
router.put('/centers/:centerID', centerController.Edit_Center)
router.post('/centers/bulk', centerController.Bulk_Insert_Centers)






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