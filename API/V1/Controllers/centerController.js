const { Sequelize, DataTypes, Op } = require("sequelize")
const { sequelize } = require('../../../startup/db')


const Insert_New_Center = async (req, res, next) => {
    try {
        const { Centers } = require('../../../models/domain/init-models')(sequelize, DataTypes)

        // if(! Validate(req.body)) {
        //     res.status(400).send()
        // }

        const newCenter = await Centers.create(req.body);
        //const newCenter = await Centers.build(req.body);
        //await newCenter.save();

        res.status(200).send(newCenter)
    } catch (err) {
        res.status(500).send(err)
    }
}


const List_All_Centers = async (req, res, next) => {
    try {
        var centerModel = require('../../../models/domain/Centers')(sequelize, DataTypes)

        const allCenters = await centerModel.findAll();
        res.status(200).send(allCenters)
    } catch (err) {
        res.status(500).send(err)
    }
}


const Get_Center_By_ID = async (req, res, next) => {
    try {
        var centerModel = require('../../../models/domain/Centers')(sequelize, DataTypes)

        const result = await centerModel.findOne({
            where: {
                CenterID_Ora: req.params.centerID
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


const Edit_Center = async (req, res, next) => {
    try {
        var { Centers } = require('../../../models/domain/init-models')(sequelize, DataTypes)
        
        
        // if(! Validate(req.body)) {
        //     res.status(400).send()
        // }

        var result = await Centers.update(req.body, {
            where: {
                CenterID_Ora: Number(req.params.centerID)
            }
        });

        //result = { ...result.dataValues, ...userInput }
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

const Bulk_Insert_Centers = async (req, res, next) => {

    let tran1;
    try {
        tran1 = await sequelize.transaction();
        var centerModel = require('../../../models/domain/Centers')(sequelize, DataTypes)


        await centerModel.destroy({ where: {} }, { transaction: tran1 });
        await centerModel.bulkCreate(req.body, { transaction: tran1 });

        // commit
        await tran1.commit();
        res.status(200).send('OK');
    } catch (err) {
        await tran1.rollback();
        res.status(500).send(err)
    }
}

module.exports = {
    Insert_New_Center,
    Edit_Center,
    Bulk_Insert_Centers,
    List_All_Centers,
    Get_Center_By_ID
}