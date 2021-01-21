// const { DateTime } = require("mssql");

// // var today = new Date()
// // console.log(today.getDate())
// // console.log(today.getMonth())
// // console.log(today.getFullYear())

// // console.log( new Date().toLocaleDateString('fa-IR'))

// const moment = require('jalali-moment')
// const m = moment();



// console.log(m.format('YYYY-MM-DD'))
// console.log('***************************')


// console.log(m.format('YYYY-MM-DD'))
// console.log(m.format())
// m.locale('fa');
// console.log(m.format('YY-MM-DD'))
// // moment.locale('fa'); // ==> to change the locale globally
// console.log(moment.from('2018-04-04', 'en', 'YYYY-MM-DD').format());// it would be in jalali system
// console.log(moment.from('1368/11/05', 'fa', 'YYYY/MM/DD').format())


// // Let's Convert:
// console.log('----------------------------------')
// console.log(moment.from('1367/11/04', 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')); // 1989/01/24
// console.log(moment('1989/01/24', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')); // 1367/11/04


// // Let's Compare:
// console.log(moment().format() > moment.from('1368/11/05', 'fa', 'YYYY/MM/DD').format())


// var list = [{
//     name: "Alex", Age: 20
// },
// {
//     name: "Mary", Age: 35
// }]
// list.forEach(r => {
//     console.log(r)
//     r = {...r, Sex:0}
//     console.log(r)
// })


// const moment  =require('jalali-moment')
// const m = moment()
// console.log(m.format('YYYY-MM-DD'))




// app.get('/cities2', async (req, res) => {
//     try {
//         await sql.connect('mssql://tabarok.ir_hd:123Qwe!@@185.128.81.55:1933/tabarok.ir_hybridsale')
//         // const result = await sql.query`select * from mytable where id = ${value}`
//         const result = await sql.query`SELECT * FROM [tabarok.ir_hybridsale].[dbo].[V_OstanCity]`
//         res.status(200).send(result.recordset)
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })


// var now = new Date()
// //console.log(now.getHours())    
// console.log(new Date().toTimeString())
// console.log(new Date().toLocaleString())
// console.log(new Date().toLocaleTimeString())



// var timestamp = new Date().getUTCMilliseconds();
// console.log(timestamp)


var jwt = require('jsonwebtoken');

var tokenBody = {
    'ID': 'TIG',
    'CID': 'TIG',
    'PR': true,
}


var token = jwt.sign(tokenBody, 'shhhhh', { expiresIn: '10947d' });
console.log(token)
console.log(token.length)
console.log(Math.floor(Date.now() / 1000))


// const randtoken = require('rand-token')
// console.log(randtoken.uid(32))


// var decoded = jwt.decode(token, {complete: true});
// console.log(decoded.header);
// console.log(decoded.payload)
// var decoded = jwt.decode(token);
// console.log(decoded)
// // console.log(Date.parse(decoded.iat) < Date.parse(decoded.exp))
// console.log(decoded.iat < decoded.exp)

// var str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoibUZHV1N4TzJ1dGJ2ZkRET3RFblhhWUNUdFRaYldqU2YiLCJpYXQiOjE2MTAzNTMyODksImV4cCI6MTYxMDQzOTY4OX0.V-CncB76KBTaM3vXLogdUTA7KiJtJBUy8IdK1yi25Bg"
// console.log(str.length)

//--------------------------------------------------------
//--------   Tracking Code generate

// var now = new Date();
// var start = new Date(now.getFullYear(), 0, 0);
// var diff = now - start;
// var oneDay = 1000 * 60 * 60 * 24;
// var DAY = Math.floor(diff / oneDay);
// console.log('Day of year: ' + DAY);
// // console.log(now.getFullYear())
// // console.log(now.getFullYear().toString().substring(2,4))
// const YEAR = now.getFullYear().toString().substring(2,4);

// //------- To convert day of the year back to date:
// function dateFromDay(year, day) {
//     var date = new Date(year, 0); // initialize a date in `year-01-01`
//     return new Date(date.setDate(day)); // add the number of days
// }

// console.log(dateFromDay(2010, 301)); // "Thu Oct 28 2010", today ;)
// console.log(dateFromDay(2010, 365)); // "Fri Dec 31 2010"
// //--------------------------------------------------------------------------------
// console.log('========================')

// TimeStr = 'ABCDEFGHIJKLMNPQRSTUVWYZ';
// console.log('char for hour: '+ TimeStr[parseInt(now.getHours())])
// const HourCharacter = TimeStr[parseInt(now.getHours())]

// const { v4: uuidv4 } = require('uuid');
// // [1,2,3,4,5,6,7,8,9,10].map(r => {
// //     console.log(uuidv4())
// // })

// Array(5).fill().map(r => {
//     let str = uuidv4()
//     // console.log(str)
//     console.log(str.substring(9, 13))    
// })


// const RANDOM_4 = uuidv4().substring(9, 13)
// const strBase = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ!@#$&*123456789";
// const MinuteCharacter = strBase[parseInt(now.getMinutes())]
// //Math.floor(Math.random() * 10) + 1;  // returns a random integer from 1 to 10 
// console.log(Math.floor(Math.random() * 63) ) 
// const RandomChar = strBase[Math.floor(Math.random() * 63) ]
// console.log(RandomChar)
// console.log(YEAR+'-'+DAY+'/'+HourCharacter+MinuteCharacter+RANDOM_4+RandomChar)


// const TrackingCode = require('./Services/TrackingCode')

// console.log(TrackingCode.generate());

// Array(200).fill().map(r => {
//     console.log(TrackingCode.generate())
// })


const _ = require('lodash');
const moment = require('moment')
const { SODA_COLL_MAP_MODE } = require('oracledb');
const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize");
const RefTokenLogs = require('./models/domain/RefTokenLogs');
const { sequelize } = require('./startup/db')

const DB = require('./models/domain/init-models')(sequelize)

var list = []
const main = async () => {
    const result = await DB.RefTokenLogs.findAll({})
    list = _.map(result, o => _.omit(o.dataValues, ['RefreshToken']));
    console.log(result[0].dataValues.LastUpdated)
    console.log(list)


    // var curr = new Date();
    // var yesterday = new Date(curr).setHours(curr.getHours() - 1)
    // //yesterday.setDay(curr.getDay() - 1)
    // var yesterday = Date.parse(yesterday).setMonth(2)

    // // var yesterday = d.setHours(d.getHours() - 1 ); 
    // // yesterday = new Date(yesterday).setDay(new Date(yesterday).getDay()-1);
    // console.log(yesterday)
    // // var date = new Date(yesterday * 1000)
    // // console.log(date.getHours())
    // console.log(new Date(yesterday).toTimeString())
    // console.log(new Date(yesterday).toLocaleTimeString())
    // console.log(new Date(yesterday).toDateString())


    // moment().subtract(1, 'days')
    var a = moment();
    var yesterday = a.subtract({ hours: 25 });
    console.log(yesterday)
    console.log(new Date() > yesterday)

    list = _.map(list, rec => rec["DEL"] = (rec.LastUpdated < yesterday))
    console.log(list)

    var r = await DB.RefTokenLogs.findAll({
        where: {
            LastUpdated: {
                [Op.lte]: yesterday
            }
        }
    })

    r = _.map(r, rec => rec.dataValues)
    console.log(r)

    

    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));    
}


const f = async () => {
    await main()
}

f()



