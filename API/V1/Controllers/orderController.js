const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize")
const { sequelize } = require('../../../startup/db')
const _ = require('lodash')
const moment = require('jalali-moment')


var { Orders, OrderDetails } = require('../../../models/domain/init-models').initModels(sequelize)


const Save_Order_On_Insert = async (req, res, next) => {

    let tran1;

    try {
        //console.log(req.body)
        // run validation
        // return 400 if not validated        
        tran1 = await sequelize.transaction();

        let order_header = _.pick(req.body, ['CustomerID_TFOra','UserID','ShippedDate','ShipCity','ShipAddress','OrderStatusID', 'OracleRead'])

        const newOrder = await Orders.create(order_header, { transaction: tran1 });
        //console.log(newOrder.dataValues)
        var list = []
        req.body.OrderDetails.forEach(rec => {
            rec = { ...rec, OrderID: Number(newOrder.dataValues.OrderID) }
            //rec['OrderID'] = newOrder.dataValues.OrderID
            list.push(rec)
        })

        list = _.map(list, o => _.omit(o, ['OrderDetID']));
        OrderDetails.bulkCreate(list, { transaction: tran1 }).then(async () => {

            // commit
            await tran1.commit();
            res.status(200).send(newOrder);
        }).catch(err => {

            tran1.rollback();// Is this the right place?
            res.status(500).send('NOK');
        })


    } catch (err) {
        res.status(500).send(err)
    }
}


const List_Orders_Of_Today = async (req, res, next) => {
    const m = moment();
    const currentDate = m.format('YYYY-MM-DD')
    console.log(currentDate)

    try {
        const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await Orders.findAll({
            where: {
                OrderDate: {
                    [Op.gte]: currentDate //m.add(1, 'day').format('YYYY-MM-DD')// gregorian date
                }
            },
            include: OrderDetails
        })

        res.status(200).send(result)

    } catch (err) {
        res.status(500).send(err)
    }
}


const List_Orders_From_To = async (req, res, next) => {

    if (!req.params.FROM) {
        res.status(400).send('From date is neccessary')
    }

    console.log(req.params.FROM)
    console.log(req.params.TO)
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

    console.log({ "from": _from, "to": _to })


    try {
        const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await Orders.findAll({
            where: {
                OrderDate: {
                    [Op.and]: [
                        { [Op.gte]: _from },
                        { [Op.lte]: _to }
                    ]
                }
            },
            include: OrderDetails
        })


        res.status(200).send(result)

    } catch (err) {
        res.status(500).send(err)
    }
}

const Get_Order_By_ID = async (req, res, next) => {
    try {
        const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await Orders.findOne({
            where: {
                OrderID: req.params.orderID
            },
            include: OrderDetails
        })

        res.status(200).send(result)

    } catch (err) {
        res.status(500).send(err)
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
        const { Orders } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        await Orders.update({ OracleRead: Number(FLAG), OrderStatusID: FLAG === '1' ? STATUS_PENDING : STATUS_SAVED }, {
            where: {
                OrderID: Number(req.params.orderID)
            }
        })

        res.status(200).send('OK');
    } catch (err) {
        res.status(500).send(err)
    }
}


const List_Orders_ByTIG_OraRead = async (req, res, next) => {
    try {
        const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await Orders.findAll({
            where: {
                OracleRead: parseInt(req.params.oraRead)
            },
            include: OrderDetails
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}


const Change_Order_Status = async (req, res, next) => {
    try {
        const { Orders } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        await Orders.update({ OrderStatusID: req.params.statusID }, {
            where: {
                OrderID: req.params.orderID
            }            
        })

        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
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
    // Modify_Order_Details_Confirm_ByTIG
}