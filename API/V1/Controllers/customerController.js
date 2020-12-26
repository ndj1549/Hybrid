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

        // if(! Validate(req.body)) {
        //     res.status(400).send()
        // }

        var userInput = req.params.body
        result = { ...result, ...userInput }
        await result.save()


        res.status(200).send(newCustomer)

    } catch (err) {
        res.status(500).send(err)
    }
}



const Bulk_Insert_Customers = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        customerModel.bulkCreate(req.body).then(() => {
            //return customerModel.findAll();
            res.status(200).send('OK');
        }).catch(err => {
            console.log(err)
            res.status(500).send('NOK');
        })
    } catch (err) {
        res.status(500).send(err)
    }
}


const Bulk_Update_Customers = async (req, res, next) => {
    try {
        var customerModel = require('../../../models/domain/Customers')(sequelize, DataTypes)

        customerModel.bulkCreate(req.body,
            {
                updateOnDuplicate: [
                    "CustomerID",
                    "CutomerFamily",
                    "MandeEtebar"
                ]
            }).then(() => {
                res.status(200).send('OK');
            }).catch(err => {
                console.log(err)
                res.status(500).send('NOK');
            })
    } catch (err) {
        res.status(500).send(err)
    }
}




module.exports = {
    List_Cutomers,
    Get_Customer_By_ID,
    List_Customers_By_CityID,
    Update_Customer_Attributes,
    Insert_New_Customer,
    Bulk_Insert_Customers,
    Bulk_Update_Customers
}