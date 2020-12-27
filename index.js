const morgan = require('morgan')
const { DataTypes } = require("sequelize")
const { sequelize } = require('./startup/db')
const sql = require('mssql')
const config = require('config')
const express = require('express')
const app = express()


// ----------------------------  Basic Config
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';


//----------------------------- Middlewares
// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//--- json parse the request body
app.use(express.json());
app.use(morgan('tiny'));




// ---------------------------- Routes
app.use('/api', require('./API'));



app.get('/', (req, res) => {
    // throw new Error('woops');
    console.log('called / : at '+ new Date().toString())
    res.status(200).send('OK');
});



app.post('/bulk', (req, res) => {
    console.log(req.body)
    // throw new Error('woops');

    //---------  Models
    var User = require('./models/domain/Users')(sequelize, DataTypes)

    User.bulkCreate(req.body).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
        //return User.findAll();
        res.status(200).send('OK');
    }).catch(err => {
        //console.log(users) // ... in order to get the array of user objects
        res.status(500).send('NOK');
    })

    //res.status(200).send('OK');
});


// const connSQL = config.get("connStr.sql");
// console.log(connSQL)
// const sequelize = new Sequelize(connSQL.database, connSQL.user, connSQL.pass, {
//     host: connSQL.host,
//     port: connSQL.port,
//     dialect: connSQL.dialect
// });

app.get('/cities', async (req, res) => {
    try {
        // console.log(sequelize)
        var cities = require('./models/domain/City')(sequelize, DataTypes)
        console.log('Connection has been established successfully.');

        const allCities = await cities.findAll();
        res.status(200).send(allCities)
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        res.status(500).send(err)
    }
})

app.get('/cities2', async (req, res) => {
    try {
        await sql.connect('mssql://tabarok.ir_hd:123Qwe!@@185.128.81.55:1933/tabarok.ir_hybridsale')
        // const result = await sql.query`select * from mytable where id = ${value}`
        const result = await sql.query`SELECT * FROM [tabarok.ir_hybridsale].[dbo].[V_OstanCity]`
        res.status(200).send(result.recordset)
    } catch (err) {
        res.status(500).send(err)
    }
})



const server = app.listen(PORT, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('API running at http://%s:%s', host, port);
});