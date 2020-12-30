const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require('../../../startup/db')


const List_Ostans = async (req, res, next) => {
    try {
        var ostans = require('../../../models/domain/Ostan')(sequelize, DataTypes)

        const allOstans = await ostans.findAll();
        res.status(200).send(allOstans)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
}

const List_Cities = async (req, res, next) => {
    try {
        var cities = require('../../../models/domain/City')(sequelize, DataTypes)

        const allCities = await cities.findAll();
        res.status(200).send(allCities)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
}

const Get_Ostan_By_ID = async (req, res, next) => {
    try {
        var ostan = require('../../../models/domain/Ostan')(sequelize, DataTypes)
    
        const result = await ostan.findOne({
          where: {
            OstanID: req.params.ostanID
          }
        });
        res.status(200).send(result)
      } catch (err) {
        res.status(500).send(err)
      }
}

const Get_City_By_ID = async (req, res, next) => {
    try {
        var city = require('../../../models/domain/City')(sequelize, DataTypes)
    
        const result = await city.findOne({
          where: {
            CityID_Ora: req.params.cityID
          }
        });
        res.status(200).send(result)
      } catch (err) {
        res.status(500).send(err)
      }
}

const List_Cities_Of_Ostan = async (req, res, next) => {
    try {
        var city = require('../../../models/domain/City')(sequelize, DataTypes)
    
        const result = await city.findAll({
          where: {
            OstanID_Ora: req.params.ostanID
          }
        });
        res.status(200).send(result)
      } catch (err) {
        res.status(500).send(err)
      }
}


const List_OstanCity = async (req, res, next) => {
  try {

    const { City, Ostan } = require('../../../models/domain/init-models')(sequelize, DataTypes)
    const mmm = await City.findAll({ include: Ostan })

    res.status(200).send(mmm)
  } catch (err) {
    res.status(500).send(err)
  }
}


module.exports = {
    List_Ostans,
    List_Cities,
    Get_Ostan_By_ID,
    Get_City_By_ID,
    List_Cities_Of_Ostan
    //List_OstanCity
}