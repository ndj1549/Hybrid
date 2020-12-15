const { DataTypes } = require("sequelize")
const { poolPromise, sequelize } = require('../../startup/db')
const express = require('express')
const router = express.Router()

//---------  Models
var city_model = require('../../models/domain/City')(sequelize, DataTypes)

router.get('/test/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200).send(req.params.id);
});

router.get('/cc1/:id', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('input_parameter', sql.Int, req.params.id)
            .query('SELECT * FROM [tabarok.ir_hybridsale].[dbo].[V_OstanCity] WHERE OstanID = @input_parameter')      
    
        res.json(result.recordset)
      } catch (err) {
        res.status(500)
        res.send(err.message)
      }
})


router.get('/cc2/:id', async (req, res) => {
    try {
        await sequelize.authenticate();
        const r = await city_model.findAll();
        res.status(200).send(r);
      } catch (err) {
        res.status(500)
        res.send(err.message)
      }
})


module.exports = router;