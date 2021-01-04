const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require('../../../startup/db')


const List_Status = async (req, res, next) => {
    try {
        var statusModel = require('../../../models/domain/OrderStatus')(sequelize, DataTypes)

        const list = await statusModel.findAll();
        res.status(200).send(list)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
}

module.exports = {
    List_Status
}