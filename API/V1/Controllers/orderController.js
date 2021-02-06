
const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize")
const { sequelize, sql, poolPromise } = require('../../../startup/db')
const TrackingCode = require('../../../Services/TrackingCode')
const OP = require('../../../Utils/OperationType')
const _ = require('lodash')
const moment = require('jalali-moment')
// const { Numeric } = require('mssql')








var { Orders, OrderDetails } = require('../../../models/domain/init-models').initModels(sequelize)
var DB = require('../../../models/domain/init-models')(sequelize, DataTypes)

const Save_Order_On_Insert = async (req, res, next) => {

    let tran1;

    let m = moment();
    m = moment(m.format('YYYY/MM/DD'), 'YYYY/MM/DDD');// parse a gregorian (miladi) date
    // console.log(m.format('jYYYY/jMM/jDD')); // 1399/11/05
    // console.log(m.format('jYYYYjMMjDD')); // 13991105



    try {
        //console.log(req.body)
        // run validation
        // return 400 if not validated        
        tran1 = await sequelize.transaction();

        // let order_header = _.pick(req.body, ['CustomerID_TFOra', 'UserID', 'ShippedDate', 'ShipCity', 'ShipAddress', 'OrderStatusID', 'OracleRead'])
        let order_header = _.pick(req.body, ['OrderType', 'WhichOrderID', 'CustomerID_TFOra', 'ShippedDate', 'ShipCity', 'ShipAddress'])

        //order_header['TrackingCode'] = TrackingCode.generate()
        // OrderType == 1 : means this is a new order to register
        // OrderType == 2 : means this is a new order to register but to extradite some details of a previously registered order
        order_header['OrderStatusID'] = order_header['OrderType'] === 1 ? 1 : 9; // 9 is مرجوعی
        order_header['OracleRead'] = 0;
        order_header['UserID'] = req.user.ID;
        order_header['IntOrderDate'] = Number(moment(new Date(), 'YYYY/MM/DDD').locale('fa').format('YYYYMMDD'))
        const newOrder = await DB.Orders.create(order_header, { transaction: tran1 });
        //console.log(newOrder.dataValues)
        var list = []
        req.body.OrderDetails.forEach(rec => {
            rec = { ...rec, OrderID: Number(newOrder.dataValues.OrderID), IntDate: order_header['IntOrderDate'] }
            //rec['OrderID'] = newOrder.dataValues.OrderID
            list.push(rec)
        })



        let detailsList = _.map(list, o => _.omit(o, ['OrderDetID']));
        // OrderDetails.bulkCreate(list, { transaction: tran1 }).then(async () => {
        //     // commit
        //     await tran1.commit();
        //     res.status(200).send(newOrder);
        // }).catch(err => {
        //     await tran1.rollback();// Is this the right place?
        //     next(err)
        // })
        detailsList.forEach(async (rec) => {
            await DB.OrderDetails.create(rec, { transaction: tran1 })
        })
        // await DB.OrderDetails.bulkCreate(detailsList, { transaction: tran1 });



        // update mojudi anbar        
        var listPromises = []
        list.forEach((rec) => {
            // console.log(rec)
            listPromises.push(DB.Product_Repository.decrement('MOJUDI', {
                by: Number(rec.Quantity * rec.PackSize),
                where: {
                    [Op.and]: [
                        { PRODUCTIDORA: Number(rec.ProductID) },
                        { CENTERID: Number(req.user.CID) },// set through Auth middleware
                    ]
                },
                transaction: tran1
            }))
        })
        await Promise.all(listPromises)



        // commit
        await tran1.commit();
        res.status(200).send(newOrder);


    } catch (err) {
        await tran1.rollback();
        next(err)
    }
}


const List_Orders_Of_Today = async (req, res, next) => {
    const m = moment();
    const currentDate = m.format('YYYY-MM-DD')
    console.log(currentDate)

    try {

        // const result = await DB.Orders.findAll({
        //     where: {
        //         OrderDate: {
        //             [Op.gte]: currentDate //m.add(1, 'day').format('YYYY-MM-DD')// gregorian date
        //         }
        //     },
        //     include: DB.OrderDetails
        // })


        const result = await DB.Orders.findAll({
            where: {
                IntOrderDate: Number(moment(new Date(), 'YYYY/MM/DDD').locale('fa').format('YYYYMMDD'))
            },
            include: DB.OrderDetails
        })

        res.status(200).send(result)

    } catch (err) {
        next(err)
    }
}


const List_Orders_From_To = async (req, res, next) => {

    if (!req.params.FROM) {
        res.status(400).send('From date is neccessary')
    }

    // console.log(req.params.FROM)
    // console.log(req.params.TO)
    // convert dates from persian to gregorian
    // const m = moment();
    // const _from = moment.from(req.params.FROM, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD')
    // var _to = 0;
    // if (!req.params.TO) {
    //     console.log("you didn't provide TO date; we set it to today by default")
    //     _to = m.format('YYYY-MM-DD') // gregorian date
    // } else {
    //     _to = moment.from(req.params.TO, 'fa', 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    // }

    // // console.log({ "from": _from, "to": _to })
    // const startDate = new Date(_from.toString());
    // const endDate = new Date(_to.toString());

    const startDate = Number(req.params.FROM.replace(/-/g, ""))
    const endDate = (!req.params.TO) ? startDate : Number(req.params.TO.replace(/-/g, ""))





    try {
        // const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await DB.Orders.findAll({
            where: {
                IntOrderDate: {
                    [Op.and]: [
                        { [Op.gte]: startDate },
                        { [Op.lte]: endDate }
                    ]
                }
            },
            include: DB.OrderDetails
        })


        res.status(200).send(result)

    } catch (err) {
        next(err)
    }
}



const List_MyOrders_From_To = async (req, res, next) => {

    if (!req.params.FROM) {
        res.status(400).send('From date is neccessary')
    }


    // const m = moment();
    // const _from = moment.from(req.params.FROM, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD')
    // var _to = 0;
    // if (!req.params.TO) {
    //     console.log("you didn't provide TO date; we set it to today by default")
    //     _to = m.format('YYYY-MM-DD') // gregorian date
    // } else {
    //     _to = moment.from(req.params.TO, 'fa', 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    // }

    // // console.log({ "from": _from, "to": _to })

    // const startDate = new Date(_from.toString());
    // const endDate = new Date(_to.toString());

    const startDate = Number(req.params.FROM.replace(/-/g, ""))
    const endDate = (!req.params.TO) ? startDate : Number(req.params.TO.replace(/-/g, ""))


    try {
        // const result = await DB.Orders.findAll({
        //     where: {
        //         OrderDate: {
        //             [Op.and]: [
        //                 { [Op.gte]: startDate },
        //                 { [Op.lte]: endDate }
        //             ]
        //         },
        //         UserID: req.user.ID
        //     },
        //     include: DB.OrderDetails
        // })


        // res.status(200).send(result)


        const pool = await poolPromise
        const result = await pool.request()
            .query(
                `SELECT dbo.Orders.OrderID, dbo.Orders.OrderType, dbo.Orders.WhichOrderID, dbo.Orders.IntOrderDate, dbo.Orders.CustomerID_TFOra, dbo.Orders.UserID, dbo.Orders.OrderDate,  \
                          dbo.Orders.ShippedDate, dbo.Orders.ShipCity, dbo.Orders.ShipAddress, dbo.Orders.OrderStatusID,\ 
                          dbo.Orders.OracleRead, dbo.Orders.TrackingCode, dbo.OrderStatus.StatusName, dbo.Customers.CustomerID, \
                          dbo.Customers.CustomerName, dbo.Customers.CutomerFamily, dbo.Customers.PanelTitle, \
                          dbo.Customers.MandeEtebar, dbo.Customers.Latitude, dbo.Customers.Longitude \
            FROM   dbo.Orders \
            INNER JOIN dbo.Customers ON dbo.Orders.CustomerID_TFOra = dbo.Customers.CustomerID_TFOra \
            INNER JOIN dbo.OrderStatus ON dbo.Orders.OrderStatusID = dbo.OrderStatus.StatusID \
            WHERE dbo.Orders.UserID = ${req.user.ID} AND dbo.Orders.IntOrderDate >= ${startDate} AND dbo.Orders.IntOrderDate <= ${endDate} `);

        res.status(200).send(result.recordset)

    } catch (err) {
        next(err)
    }
}

const Get_Order_By_ID = async (req, res, next) => {
    try {

        const result = await DB.Orders.findOne({
            where: {
                OrderID: req.params.orderID
            },
            include: DB.OrderDetails
        })

        if (!result) {
            throw new MyErrorHandler(404, 'Order Not Found')
        }
        res.status(200).send(result)

    } catch (err) {
        next(err)
    }
}



const Set_OracleRead_Flag = async (req, res, next) => {
    const STATUS_PENDING = 2; // در حال بررسی
    const STATUS_SAVED = 1; // سفارش ثبت شده

    // perform validation on the input
    // return 400 error if necessary

    const FLAG = req.params.bit;
    // console.log(FLAG)
    // console.log(FLAG === '1' )
    try {

        await DB.Orders.update({ OracleRead: Number(FLAG), OrderStatusID: FLAG === '1' ? STATUS_PENDING : STATUS_SAVED }, {
            where: {
                OrderID: Number(req.params.orderID)
            }
        })

        res.status(200).send('OK');
    } catch (err) {
        next(err)
    }
}


const List_Orders_ByTIG_OraRead = async (req, res, next) => {
    try {

        const result = await DB.Orders.findAll({
            where: {
                OracleRead: parseInt(req.params.oraRead)
            },
            include: OrderDetails
        })

        res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}


const Change_Order_Status = async (req, res, next) => {
    let tran1;
    try {
        tran1 = await sequelize.transaction();
        const NewStatus = Number(req.params.statusID)
        const _order = await DB.Orders.findOne({
            where: {
                OrderID: Number(req.params.orderID)
            }
        })

        if (!_order) {
            throw new MyErrorHandler(404, 'Order Not Found')
        }


        let _OperationSucceeded = false, _COMPENSATION_CALLED = false;
        if (_order.OrderStatusID === NewStatus) {
            res.sendStatus(200)
        }
        else if (NewStatus == 3) {
            // compensate ==> increase product mojudi
            _COMPENSATION_CALLED = true;
            _OperationSucceeded = await COMPENSATE_PRODUCT_MOJUDI(_order.OrderID, req.user.CID, tran1, OP.PLUS)
        } else if (_order.OrderStatusID == 3) {
            // reverse compensate  ==> decrease product mojudi
            _COMPENSATION_CALLED = true;
            _OperationSucceeded = await COMPENSATE_PRODUCT_MOJUDI(_order.OrderID, req.user.CID, tran1, OP.MINUS)
        }


        if (_COMPENSATION_CALLED == true && !_OperationSucceeded) {
            throw new MyErrorHandler(500, 'Operation faced error !')
        }


        await DB.Orders.update({ OrderStatusID: NewStatus }, {
            where: {
                OrderID: _order.OrderID
            },
            transaction: tran1
        })

        // commit
        await tran1.commit();
        res.status(200).send()
    } catch (err) {
        await tran1.rollback();
        next(err)
    }
}

const Delete_Order = async (req, res, next) => {
    let tran1;
    try {
        tran1 = await sequelize.transaction();
        const _order = await DB.Orders.findOne({
            where: {
                OrderID: Number(req.params.orderID)
            },
            // include: OrderDetails
        })

        if (!_order) {
            throw new MyErrorHandler(404, 'Order Not Found')
        }

        // console.log(_order)

        // await DB.Orders.destroy({
        //     where: {
        //         OrderID: req.params.orderID
        //     },
        //     transaction: tran1
        // })
        // await DB.Orders.update({ OrderStatusID: 3 }, { // ابطال
        //     where: {
        //         OrderID: _order.OrderID
        //     },
        //     transaction: tran1
        // })

        // update mojudi anbar              
        const operationSucceeded = await COMPENSATE_PRODUCT_MOJUDI(_order.OrderID, req.user.CID, tran1, OP.PLUS)


        if (operationSucceeded) {
            await DB.Orders.destroy({
                where: {
                    OrderID: _order.OrderID
                },
                transaction: tran1
            })
            // commit
            await tran1.commit();
            res.sendStatus(200)
        } else {
            throw new MyErrorHandler(500, 'Delete Operation failed')
        }


    } catch (err) {
        await tran1.rollback();
        next(err)
    }
}


const COMPENSATE_PRODUCT_MOJUDI = async (orderID, centerID, tran1, OpearationType) => {

    try {
        var listDetails = await DB.OrderDetails.findAll({
            where: {
                OrderID: Number(orderID)
            }
        });


        let sign = 1;
        if (OpearationType == OP.MINUS) {
            sign = -1;
        }


        var listPromises = []
        listDetails.forEach((rec) => {
            console.log(rec)
            console.log(rec.Quantity)
            console.log(rec.PackSize)
            listPromises.push(DB.Product_Repository.increment('MOJUDI', {
                by: rec.Quantity * rec.PackSize * sign,
                where: {
                    [Op.and]: [
                        { PRODUCTIDORA: Number(rec.ProductID) },
                        { CENTERID: Number(centerID) },// set through Auth middleware
                    ]
                },
                transaction: tran1
            }))
        })

        await Promise.all(listPromises)
        return true;
    } catch (err) {
        return false
    }

}

const Get_Order_Header = async (req, res, next) => {
    try {
        // const _order = await DB.Orders.findOne({
        //     where: {
        //         OrderID: req.params.orderID
        //     }
        // })
        const pool = await poolPromise
        const result = await pool.request()
            .query(
                `SELECT dbo.Orders.OrderID, dbo.Orders.CustomerID_TFOra, dbo.Orders.UserID, dbo.Orders.OrderDate,
                    dbo.Orders.OrderType, dbo.Orders.WhichOrderID, dbo.Orders.IntOrderDate,
                    dbo.Orders.ShippedDate, dbo.Orders.ShipCity, 
                    dbo.Orders.ShipAddress, dbo.Orders.OrderStatusID, dbo.Orders.OracleRead, 
                    dbo.Orders.TrackingCode, dbo.OrderStatus.StatusName, dbo.OrderStatus.Description, 
                    dbo.Customers.CustomerID, dbo.Customers.CustomerName, 
                    dbo.Customers.CutomerFamily, dbo.Customers.PanelTitle, dbo.Customers.MandeEtebar, dbo.Customers.Latitude, dbo.Customers.Longitude
             FROM   dbo.Orders 
             INNER JOIN dbo.Customers ON dbo.Orders.CustomerID_TFOra = dbo.Customers.CustomerID_TFOra 
             INNER JOIN dbo.OrderStatus ON dbo.Orders.OrderStatusID = dbo.OrderStatus.StatusID
             WHERE dbo.Orders.OrderID = ${req.params.orderID}`);

        if (!result || result.recordset.length == 0) {
            throw new MyErrorHandler(404, 'Order Not Found')
        }

        res.status(200).json(result.recordset[0])
    } catch (err) {
        next(err)
    }
}

const Get_Details_Of_OrderID = async (req, res, next) => {
    try {

        const pool = await poolPromise
        const result = await pool.request()
            .query(
                `SELECT dbo.OrderDetails.OrderDetID, dbo.OrderDetails.OrderID, dbo.OrderDetails.ProductID, dbo.OrderDetails.Quantity,  
                        dbo.OrderDetails.QuantityConfirmed, dbo.OrderDetails.PackSize, dbo.OrderDetails.PackgID, 
                        dbo.OrderDetails.Discount, dbo.OrderDetails.Tonage, dbo.OrderDetails.Price_SingleItem,  
                        dbo.OrderDetails.TotalPrice_AfterTax, dbo.OrderDetails.Tax, dbo.OrderDetails.Afzoode, dbo.OrderDetails.Avarez, 
                        dbo.OrderDetails.InsertTimestamp, dbo.Product_Repository.TITLE, dbo.Product_Repository.MOJUDI,  
                        dbo.Product_Repository.VAHED, dbo.Product_Repository.MAX_ORDER_CAPACITY,                         
                        dbo.Product_Repository.CATEGORY_L1_ID, dbo.Product_Repository.CATEGORY_L1_NAME, dbo.Product_Repository.DISPLAY, 
                        dbo.Product_Repository.PRICE, 
                        dbo.Product_Repository.PACKAGEQUANTITY, dbo.Product_Repository.LASTUPDATE, 
                        dbo.Product_Repository.TAX AS Prod_TAX, dbo.Product_Repository.AFZOODE AS Prod_AFZOODE, 
                        dbo.Product_Repository.AVAREZ AS Prod_AVAREZ, dbo.Product_Repository.PACKAGEWEIGHT 
                FROM    dbo.OrderDetails
                INNER JOIN  dbo.Product_Repository  ON dbo.OrderDetails.ProductID = dbo.Product_Repository.PRODUCTIDORA
                WHERE	dbo.OrderDetails.OrderID = ${req.params.orderID}`);

        res.status(200).json(result.recordset)

    } catch (err) {
        next(err)
    }
}

const List_Details_Of_Orders_Today = async (req, res, next) => {
    const m = moment();
    const currentDate = m.format('YYYY-MM-DD')
    // console.log(currentDate)

    try {

        // const result = await DB.OrderDetails.findAll({
        //     where: {
        //         InsertTimestamp: {
        //             [Op.gte]: currentDate //m.add(1, 'day').format('YYYY-MM-DD')// gregorian date
        //         }
        //     }
        // })
        const result = await DB.OrderDetails.findAll({
            where: {
                IntDate: Number(moment(new Date(), 'YYYY/MM/DDD').locale('fa').format('YYYYMMDD'))
            }
        })

        res.status(200).send(result)

    } catch (err) {
        next(err)
    }
}


const List_Details_Of_Orders_FROM_TO = async (req, res, next) => {
    if (!req.params.FROM) {
        res.status(400).send('From date is neccessary')
    }

    // console.log(req.params.FROM)
    // console.log(req.params.TO)
    // convert dates from persian to gregorian
    // const m = moment();
    // const _from = moment.from(req.params.FROM, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD') // 
    // var _to = 0;
    // if (!req.params.TO) {
    //     console.log("you didn't provide TO date; we set it to today by default")
    //     _to = m.format('YYYY-MM-DD') // gregorian date
    // } else {
    //     _to = moment.from(req.params.TO, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD')
    // }

    // console.log({ "from": _from, "to": _to })


    const startDate = Number(req.params.FROM.replace(/-/g, ""))
    const endDate = (!req.params.TO) ? startDate : Number(req.params.TO.replace(/-/g, ""))


    try {
        const result = await DB.OrderDetails.findAll({
            where: {
                IntDate: {
                    [Op.and]: [
                        { [Op.gte]: startDate },
                        { [Op.lte]: endDate }
                    ]
                }
            }
        })


        res.status(200).send(result)

    } catch (err) {
        next(err)
    }
}



const Save_Order_On_Edit = async (req, res, next) => {
    let tran1;
    try {
        tran1 = await sequelize.transaction();


        //  STEP 1: 
        let listOrderDetails_DB = await DB.OrderDetails.findAll({
            where: {
                OrderID: Number(req.params.orderID)
            }
        })


        let listOrderDetails_BODY = req.body.OrderDetails;



        //  STEP 2: 
        if (req.body.OrderType === 1) { // gonna edit a usual order (not مرجوعی)
            await DB.OrderDetails.destroy({
                where: {
                    OrderID: Number(req.params.orderID)
                },
                transaction: tran1
            });


            // update mojudi anbar ==> INCREASE     
            var listPromises = []
            listOrderDetails_DB.forEach((rec) => {
                // console.log(rec)
                listPromises.push(DB.Product_Repository.increment('MOJUDI', {
                    by: Number(rec.Quantity * rec.PackSize),
                    where: {
                        [Op.and]: [
                            { PRODUCTIDORA: Number(rec.ProductID) },
                            { CENTERID: Number(req.user.CID) },// set through Auth middleware
                        ]
                    },
                    transaction: tran1
                }))
            })
            await Promise.all(listPromises)

            //  STEP 3: 
            let detailsList = _.map(listOrderDetails_BODY, o => _.omit(o, ['OrderDetID']));
            var list = []
            detailsList.forEach(rec => {
                rec = { ...rec, OrderID: Number(req.params.orderID) }
                //rec['OrderID'] = newOrder.dataValues.OrderID
                list.push(rec)
            })
            await DB.OrderDetails.bulkCreate(list, { transaction: tran1 });

            // update mojudi anbar ==> DECREASE
            listPromises = []
            list.forEach((rec) => {
                listPromises.push(DB.Product_Repository.decrement('MOJUDI', {
                    by: Number(rec.Quantity * rec.PackSize),
                    where: {
                        [Op.and]: [
                            { PRODUCTIDORA: Number(rec.ProductID) },
                            { CENTERID: Number(req.user.CID) },// set through Auth middleware
                        ]
                    },
                    transaction: tran1
                }))
            })
            await Promise.all(listPromises)


        } else { // gonna edit an extradition order (ویرایش سفارش مرجوعی)

            listOrderDetails_BODY.forEach(async (rec) => {
                await DB.OrderDetails.update(_.pick(rec, ['ProductID', 'Quantity', 'Tax', 'Afzoode', 'Avarez', 'Price_SingleItem']), {
                    where: {
                        OrderDetID: Number(rec.OrderDetID)
                    }
                })
            })
        }


        // commit
        await tran1.commit();
        res.sendStatus(200); // equivalent to res.status(200).send('OK')

    } catch (err) {
        await tran1.rollback();
        next(err)
    }
}


const Inquire_MyCartLines_Price_Quantity = async (req, res, next) => {
    try {
        const dic_Client = req.body.items;
        const result = await DB.Product_Repository.findAll({
            where: {
                CENTERID: req.user.CID,
                PRODUCTIDORA: {
                    [Op.in]: Object.keys(dic_Client)
                }                
            }
        });

        var list = result.map(o => o.dataValues).map(r => _.pick(r, ['PRODUCTIDORA', 'MOJUDI', 'PACKAGEQUANTITY', 'PRICE']))
        // const output = _.reduce(
        //     list,
        //     (acc, { PRODUCTIDORA, CENTERID, MOJUDI, PRICE }) => ({ ...acc, [PRODUCTIDORA]: {CENTERID,PRICE, "QUANTITY": MOJUDI} }),
        //     {}
        // )

        const dic_DB = list.reduce((acc, { PRODUCTIDORA, MOJUDI, PRICE, PACKAGEQUANTITY }) => 
                                        ({...acc, [PRODUCTIDORA]: { PRICE, "QUANTITY": Math.floor(( MOJUDI / PACKAGEQUANTITY))} }), {});

        const output = {}
        Object.keys(dic_DB)
              .filter(key => ( (dic_Client[key].PRICE !== dic_DB[key].PRICE) || (dic_Client[key].QUANTITY > dic_DB[key].QUANTITY) ))
              .forEach(key => output[key] = dic_DB[key])

        const success = Object.keys(output).length === 0 ? true : false;
        res.status(200).json({ items: output, success})
    } catch (err) {
        next(err)
    }
}


module.exports = {
    Save_Order_On_Insert,
    // Save_Order_On_Edit,
    Get_Order_By_ID,
    List_Orders_Of_Today,
    Set_OracleRead_Flag,
    List_Orders_ByTIG_OraRead,
    Change_Order_Status,
    // List_Orders_Made_By_UserID,
    // Get_Details_Of_OrderID,
    List_Details_Of_Orders_Today,
    List_Details_Of_Orders_FROM_TO,
    Get_Order_Header,
    Get_Details_Of_OrderID,
    List_Orders_From_To,
    List_MyOrders_From_To,
    Change_Order_Status,
    // Modify_Order_Details_Confirm_ByTIG,
    Delete_Order,
    Save_Order_On_Edit,
    Inquire_MyCartLines_Price_Quantity
}