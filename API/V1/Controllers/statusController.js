const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require('../../../startup/db')


const List_Status = async (req, res, next) => {
    try {
        var statusModel = require('../../../models/domain/OrderStatus')(sequelize, DataTypes)

        const list = await statusModel.findAll();
        res.status(200).send(list)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    List_Status
}