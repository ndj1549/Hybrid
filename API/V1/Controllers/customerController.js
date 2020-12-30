const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize")
const { sequelize } = require('../../../startup/db')


const List_Cutomers = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        const allCustomers = await customerModel.findAll();
        res.status(200).send(allCustomers)
    } catch (err) {
        res.status(500).send(err)
    }
}


const Get_Customer_By_ID = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        const result = await customerModel.findOne({
            where: {
                [Op.or]: [
                    { CustomerID_TFOra: req.params.customerID },
                    { CustomerID: req.params.customerID }
                ]
            }
        });

        if (!result) {
            res.status(404).send()
        }
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

const List_Customers_By_CityID = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        const allCustomers = await customerModel.findAll({
            where: {
                CityID: req.params.cityID
            }
        });
        res.status(200).send(allCustomers)
    } catch (err) {
        res.status(500).send(err)
    }
}


// Create = build + save
const Insert_New_Customer = async (req, res, next) => {
    try {
        const { Customers } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        console.log(req.body)

        // if(! Validate(req.body)) {
        //     res.status(400).send()
        // }

        const newCustomer = await Customers.create(req.body);
        //const newCustomer = await Customers.build(req.body);
        //await newCustomer.save();

        res.status(200).send(newCustomer)

    } catch (err) {
        res.status(500).send(err)
    }
}


const Update_Customer_Attributes = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        // const result = await customerModel.findOne({
        //     where: {
        //         [Op.or]: [
        //             { CustomerID_TFOra: req.params.customerID },
        //             { CustomerID: req.params.customerID }
        //         ]
        //     }
        // });



        // if(! Validate(req.body)) {
        //     res.status(400).send()
        // }

        //let userInput = _.pick(req.body, ['', ''])

        var result = await customerModel.update(req.body, {
            where: {
                CustomerID_TFOra: Number(req.params.customerID_TFOra)
            },
            returning: true
        });

        //result = { ...result.dataValues, ...userInput }
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}



const Bulk_Insert_Customers = async (req, res, next) => {

    let tran1; 
    try {        
        
        tran1 = await sequelize.transaction();
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)


        await customerModel.destroy({ where: {} }, { transaction: tran1 });
        await customerModel.bulkCreate(req.body, { transaction: tran1 });

        // commit
        await tran1.commit();
        res.status(200).send('OK');

        
    } catch (err) {
        res.status(500).send(err)
    }
}


const Bulk_Update_Customers = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        var tran1 = await sequelize.transaction();
        const promises = []

        req.body.forEach(async (rec) => {
            //console.log(rec)
            const promise =  customerModel.update(rec,
                {
                    where: {
                        CustomerID_TFOra: rec.CustomerID_TFOra
                    },
                    transaction: tran1
                })
                promises.push(promise)
        });

        await Promise.all(promises)

        // commit
        await tran1.commit();

        res.sendStatus(200) // equivalent to res.status(200).send('OK')
        // mssql does not support the updateOnDuplicate option
        // customerModel.bulkCreate(req.body, 
        //     {
        //         updateOnDuplicate: [
        //             "CustomerID_TFOra",
        //             "MandeEtebar"
        //         ]
        //     }).then(() => {
        //         res.status(200).send('OK');
        //     }).catch(err => {
        //         console.log(err)
        //         res.status(500).send('NOK');
        //     })
        
    } catch (err) {
        await tran1.rollback();
        res.status(500).send(err)
    }
}


const List_Customers_By_CenterIDtfOra = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        const allCustomers = await customerModel.findAll({
            where: {
                CenterID: req.params.centerID
            }
        });

        res.status(200).send(allCustomers)
    } catch (err) {
        res.status(500).send(err)
    }
}


module.exports = {
    List_Cutomers,
    Get_Customer_By_ID,
    List_Customers_By_CityID,
    List_Customers_By_CenterIDtfOra,
    Update_Customer_Attributes,
    Insert_New_Customer,
    Bulk_Insert_Customers,
    Bulk_Update_Customers
}