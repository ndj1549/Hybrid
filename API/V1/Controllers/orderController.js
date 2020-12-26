const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize")
const { sequelize } = require('../../../startup/db')
const moment = require('jalali-moment')


var { Orders, OrderDetails } = require('../../../models/domain/init-models').initModels(sequelize)


const Save_Order_On_Insert = async (req, res, next) => {

    let tran1;

    try {
        //console.log(req.body)
        // run validation
        // return 400 if not validated
        tran1 = await sequelize.transaction();

        const newOrder = await Orders.create(req.body.header, { transaction: tran1 });
        //console.log(newOrder.dataValues)
        var list = []
        req.body.details.forEach(rec => {
            rec = {...rec, OrderID: newOrder.dataValues.OrderID}
            //rec['OrderID'] = newOrder.dataValues.OrderID
            list.push(rec)
        })

        OrderDetails.bulkCreate(list, { transaction: tran1 }).then( async () => {            

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
    console.log(m.format('YYYY-MM-DD'))

    try{
        const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await Orders.findAll({ 
            where: {
                OrderDate: m.format('YYYY-MM-DD') // gregorian date
            },
            include:  OrderDetails
        })

        res.status(200).send(result)

    } catch(err){
        res.status(500).send(err)
    }
}


const List_Orders_From_To = async(req, res, next) => {
      
    if(! req.params.FROM){
        res.status(400).send('From date is neccessary')
    }

    console.log(req.params.FROM)
    console.log(req.params.TO)
    // convert dates from persian to gregorian
    const m = moment();
    const _from = moment.from(req.params.FROM, 'fa', 'YYYY-MM-DD').format() // 
    var _to = 0;
    if(! req.params.TO){
        console.log("you didn't provide TO date; we set it to today by default")
        _to = m.format('YYYY-MM-DD') // gregorian date
    } else{
        _to = moment.from(req.params.TO, 'fa', 'YYYY-MM-DD').format()
    }

    console.log({"from": _from, "to":_to})
    

    try{
        const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await Orders.findAll({ 
            where: {
                OrderDate:{
                    [Op.and]: [
                        {[Op.gte]:  _from },
                        {[Op.lte]:  _to }
                    ]
                }
            },
            include:  OrderDetails
        })


        res.status(200).send(result)

    } catch(err){
        res.status(500).send(err)
    }
}

const Get_Order_By_ID = async (req, res, next) => {
    try{
        const { Orders, OrderDetails } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        const result = await Orders.findOne({ 
            where: {
                OrderID: req.params.orderID
            },
            include:  OrderDetails
        })

        res.status(200).send(result)

    } catch(err){
        res.status(500).send(err)
    }
}


module.exports = {
    Save_Order_On_Insert,
    // Save_Order_On_Edit,
    Get_Order_By_ID,
    List_Orders_Of_Today,
    // List_Orders_Read_ByTIG,
    // List_Orders_NotYet_Read_ByTIG,
    // List_Orders_Made_By_UserID,
    List_Orders_From_To,
    // Change_Order_Status,
    // Modify_Order_Details_ByTIG
}