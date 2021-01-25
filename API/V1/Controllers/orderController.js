
const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize")
const { sequelize } = require('../../../startup/db')
const TrackingCode = require('../../../Services/TrackingCode')
const OP = require('../../../Utils/OperationType')
const _ = require('lodash')
const moment = require('jalali-moment')
const { Numeric } = require('mssql')






var { Orders, OrderDetails } = require('../../../models/domain/init-models').initModels(sequelize)


var DB = require('../../../models/domain/init-models')(sequelize, DataTypes)

const Save_Order_On_Insert = async (req, res, next) => {

    let tran1;

    try {
        //console.log(req.body)
        // run validation
        // return 400 if not validated        
        tran1 = await sequelize.transaction();

        // let order_header = _.pick(req.body, ['CustomerID_TFOra', 'UserID', 'ShippedDate', 'ShipCity', 'ShipAddress', 'OrderStatusID', 'OracleRead'])
        let order_header = _.pick(req.body, ['CustomerID_TFOra', 'ShippedDate', 'ShipCity', 'ShipAddress'])

        order_header['TrackingCode'] = TrackingCode.generate()
        order_header['OrderStatusID'] = 1;
        order_header['OracleRead'] = 0;
        order_header['UserID'] = req.user.ID;
        const newOrder = await DB.Orders.create(order_header, { transaction: tran1 });
        //console.log(newOrder.dataValues)
        var list = []
        req.body.OrderDetails.forEach(rec => {
            rec = { ...rec, OrderID: Number(newOrder.dataValues.OrderID) }
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
        await DB.OrderDetails.bulkCreate(detailsList, { transaction: tran1 });



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

        const result = await DB.Orders.findAll({
            where: {
                OrderDate: {
                    [Op.gte]: currentDate //m.add(1, 'day').format('YYYY-MM-DD')// gregorian date
                }
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
    const m = moment();
    const _from = moment.from(req.params.FROM, 'fa', 'YYYY-MM-DD').format() // 
    var _to = 0;
    if (!req.params.TO) {
        console.log("you didn't provide TO date; we set it to today by default")
        _to = m.format('YYYY-MM-DD') // gregorian date
    } else {
        _to = moment.from(req.params.TO, 'fa', 'YYYY-MM-DD').format()
    }

    // console.log({ "from": _from, "to": _to })


    try {
        // const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await DB.Orders.findAll({
            where: {
                OrderDate: {
                    [Op.and]: [
                        { [Op.gte]: _from },
                        { [Op.lte]: _to }
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


        let FLAG_OperationSucceeded = false;
        if (_order.OrderStatusID === NewStatus) {
            res.sendStatus(200)
        }
        else if (NewStatus == 3) {
            // compensate ==> increase product mojudi
            FLAG_OperationSucceeded = await COMPENSATE_PRODUCT_MOJUDI(_order.OrderID, req.user.CID, tran1, OP.PLUS)
        } else if (_order.OrderStatusID == 3) {
            // reverse compensate  ==> decrease product mojudi
            FLAG_OperationSucceeded = await COMPENSATE_PRODUCT_MOJUDI(_order.OrderID, req.user.CID, tran1, OP.MINUS)
        }



        if(FLAG_OperationSucceeded) {
            await DB.Orders.update({ OrderStatusID: NewStatus }, {
                where: {
                    OrderID: _order.OrderID
                },
                transaction: tran1
            })
        } else {
            throw new MyErrorHandler(500, 'Operation faced error !')
        }


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
            where:{
                OrderID: Number(orderID)
            }
        });


        let sign = 1;
        if(OpearationType == OP.MINUS) {
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




module.exports = {
    Save_Order_On_Insert,
    // Save_Order_On_Edit,
    Get_Order_By_ID,
    List_Orders_Of_Today,
    Set_OracleRead_Flag,
    List_Orders_ByTIG_OraRead,
    Change_Order_Status,
    // List_Orders_Made_By_UserID,
    // Get_Details_Of_OrderID
    List_Orders_From_To,
    Change_Order_Status,
    // Modify_Order_Details_Confirm_ByTIG,
    Delete_Order
}