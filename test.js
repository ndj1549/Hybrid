// // const { DateTime } = require("mssql");

// // // var today = new Date()
// // // console.log(today.getDate())
// // // console.log(today.getMonth())
// // // console.log(today.getFullYear())

// // // console.log( new Date().toLocaleDateString('fa-IR'))

// const moment = require('jalali-moment')
// const m = moment();



// console.log(m.format('YYYY-MM-DD'))
// console.log('***************************')


// // console.log(m.format('YYYY-MM-DD'))
// // console.log(m.format())
// // m.locale('fa');
// // console.log(m.format('YY-MM-DD'))
// // // moment.locale('fa'); // ==> to change the locale globally
// // console.log(moment.from('2018-04-04', 'en', 'YYYY-MM-DD').format());// it would be in jalali system
// // console.log(moment.from('1368/11/05', 'fa', 'YYYY/MM/DD').format())


// // // Let's Convert:
// // console.log('----------------------------------')
// // console.log(moment.from('1367/11/04', 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')); // 1989/01/24
// // console.log(moment('1989/01/24', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')); // 1367/11/04


// // // Let's Compare:
// // console.log(moment().format() > moment.from('1368/11/05', 'fa', 'YYYY/MM/DD').format())


// // var list = [{
// //     name: "Alex", Age: 20
// // },
// // {
// //     name: "Mary", Age: 35
// // }]
// // list.forEach(r => {
// //     console.log(r)
// //     r = {...r, Sex:0}
// //     console.log(r)
// // })


// // const moment  =require('jalali-moment')
// // const m = moment()
// // console.log(m.format('YYYY-MM-DD'))




// // app.get('/cities2', async (req, res) => {
// //     try {
// //         await sql.connect('mssql://tabarok.ir_hd:123Qwe!@@185.128.81.55:1933/tabarok.ir_hybridsale')
// //         // const result = await sql.query`select * from mytable where id = ${value}`
// //         const result = await sql.query`SELECT * FROM [tabarok.ir_hybridsale].[dbo].[V_OstanCity]`
// //         res.status(200).send(result.recordset)
// //     } catch (err) {
// //         res.status(500).send(err)
// //     }
// // })


// // var now = new Date()
// // //console.log(now.getHours())    
// // console.log(new Date().toTimeString())
// // console.log(new Date().toLocaleString())
// // console.log(new Date().toLocaleTimeString())



// // var timestamp = new Date().getUTCMilliseconds();
// // console.log(timestamp)


var jwt = require('jsonwebtoken');

var tokenBody = {
    'ID': 'TIG',
    'CID': 'TIG',
    'PR': true,
}


var token = jwt.sign(tokenBody, "}YS%TOmeEhyV,>dp747$EgG%y5,PZV?G", { expiresIn: '10947d' });
console.log(token)
console.log(token.length)
console.log(Math.floor(Date.now() / 1000))
console.log('################################################')


// // const randtoken = require('rand-token')
// // console.log(randtoken.uid(32))


// // var decoded = jwt.decode(token, {complete: true});
// // console.log(decoded.header);
// // console.log(decoded.payload)
// // var decoded = jwt.decode(token);
// // console.log(decoded)
// // // console.log(Date.parse(decoded.iat) < Date.parse(decoded.exp))
// // console.log(decoded.iat < decoded.exp)

// // var str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoibUZHV1N4TzJ1dGJ2ZkRET3RFblhhWUNUdFRaYldqU2YiLCJpYXQiOjE2MTAzNTMyODksImV4cCI6MTYxMDQzOTY4OX0.V-CncB76KBTaM3vXLogdUTA7KiJtJBUy8IdK1yi25Bg"
// // console.log(str.length)

// //--------------------------------------------------------
// //--------   Tracking Code generate

// // var now = new Date();
// // var start = new Date(now.getFullYear(), 0, 0);
// // var diff = now - start;
// // var oneDay = 1000 * 60 * 60 * 24;
// // var DAY = Math.floor(diff / oneDay);
// // console.log('Day of year: ' + DAY);
// // // console.log(now.getFullYear())
// // // console.log(now.getFullYear().toString().substring(2,4))
// // const YEAR = now.getFullYear().toString().substring(2,4);

// // //------- To convert day of the year back to date:
// // function dateFromDay(year, day) {
// //     var date = new Date(year, 0); // initialize a date in `year-01-01`
// //     return new Date(date.setDate(day)); // add the number of days
// // }

// // console.log(dateFromDay(2010, 301)); // "Thu Oct 28 2010", today ;)
// // console.log(dateFromDay(2010, 365)); // "Fri Dec 31 2010"
// // //--------------------------------------------------------------------------------
// // console.log('========================')

// // TimeStr = 'ABCDEFGHIJKLMNPQRSTUVWYZ';
// // console.log('char for hour: '+ TimeStr[parseInt(now.getHours())])
// // const HourCharacter = TimeStr[parseInt(now.getHours())]

// // const { v4: uuidv4 } = require('uuid');
// // // [1,2,3,4,5,6,7,8,9,10].map(r => {
// // //     console.log(uuidv4())
// // // })

// // Array(5).fill().map(r => {
// //     let str = uuidv4()
// //     // console.log(str)
// //     console.log(str.substring(9, 13))    
// // })


// // const RANDOM_4 = uuidv4().substring(9, 13)
// // const strBase = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ!@#$&*123456789";
// // const MinuteCharacter = strBase[parseInt(now.getMinutes())]
// // //Math.floor(Math.random() * 10) + 1;  // returns a random integer from 1 to 10 
// // console.log(Math.floor(Math.random() * 63) ) 
// // const RandomChar = strBase[Math.floor(Math.random() * 63) ]
// // console.log(RandomChar)
// // console.log(YEAR+'-'+DAY+'/'+HourCharacter+MinuteCharacter+RANDOM_4+RandomChar)


// // const TrackingCode = require('./Services/TrackingCode')

// // console.log(TrackingCode.generate());

// // Array(200).fill().map(r => {
// //     console.log(TrackingCode.generate())
// // })


// const _ = require('lodash');
// const moment = require('moment')
// const { SODA_COLL_MAP_MODE } = require('oracledb');
// const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize");
// const RefTokenLogs = require('./models/domain/RefTokenLogs');
// const { sequelize } = require('./startup/db')

// const DB = require('./models/domain/init-models')(sequelize)

// var list = []
// const main = async () => {
//     const result = await DB.RefTokenLogs.findAll({})
//     list = _.map(result, o => _.omit(o.dataValues, ['RefreshToken']));
//     console.log(result[0].dataValues.LastUpdated)
//     console.log(list)


//     // var curr = new Date();
//     // var yesterday = new Date(curr).setHours(curr.getHours() - 1)
//     // //yesterday.setDay(curr.getDay() - 1)
//     // var yesterday = Date.parse(yesterday).setMonth(2)

//     // // var yesterday = d.setHours(d.getHours() - 1 ); 
//     // // yesterday = new Date(yesterday).setDay(new Date(yesterday).getDay()-1);
//     // console.log(yesterday)
//     // // var date = new Date(yesterday * 1000)
//     // // console.log(date.getHours())
//     // console.log(new Date(yesterday).toTimeString())
//     // console.log(new Date(yesterday).toLocaleTimeString())
//     // console.log(new Date(yesterday).toDateString())


//     // moment().subtract(1, 'days')
//     var a = moment();
//     var yesterday = a.subtract({ hours: 25 });
//     console.log(yesterday)
//     console.log(new Date() > yesterday)

//     list = _.map(list, rec => rec["DEL"] = (rec.LastUpdated < yesterday))
//     console.log(list)

//     var r = await DB.RefTokenLogs.findAll({
//         where: {
//             LastUpdated: {
//                 [Op.lte]: yesterday
//             }
//         }
//     })

//     r = _.map(r, rec => rec.dataValues)
//     console.log(r)



//     // const diffTime = Math.abs(date2 - date1);
//     // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));    
// }


// const f = async () => {
//     await main()
// }

// f()

// const _ = require('lodash')

// var allProducts = [
//     {name:'Ali', age:23},
//     {name:'Ali', age:24},
//     {name:'Ali', age:25},
//     {name:'Ali', age:26},
// ]

// // _.map(allProducts, rec =>  { ...rec, "H":88} )



// const list = allProducts.map(rec => {
//     // console.log(rec)
//     // console.log({ ...rec, MOJUDI:rec.age * 2 })
//     return { ...rec, MOJUDI:rec.age * 2 }
// })

// console.log(list)


// function isValidDate(dateString) {
//     var regEx = /^\d{4}-\d{2}-\d{2}$/;
//     if(!dateString.match(regEx)) return false;  // Invalid format
//     var d = new Date(dateString);
//     var dNum = d.getTime();
//     if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
//     return d.toISOString().slice(0,10) === dateString;
//   }


//   /* Example Uses */
//   console.log(isValidDate("0000-00-00"));  // false
//   console.log(isValidDate("2015-01-40"));  // false
//   console.log(isValidDate("2016-11-25"));  // true
//   console.log(isValidDate("1970-01-01"));  // true = epoch
//   console.log(isValidDate("1395-05-31")); 
//   console.log(isValidDate("1395-05-32")); 



// let today = new Date('1399-11-12').toDateString('en-US');
// console.log(today);

// let today2 = new Date().toLocaleDateString('fa-IR');
// console.log(today2);


const moment = require('jalali-moment')


var m = moment();



// console.log(m.format('YYYY-MM-DD'))
// console.log(moment.from(m.format('YYYY-MM-DD'), 'fa', 'DD/YYYY/MM').format('DD/YYYY/MM'))
// console.log(moment.from('1367/11/04', 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')); // 1989/01/24
// console.log(moment.from('2018/04/04', 'en', 'YYYY-MM-DD').format());// it would be in jalali system
// console.log(moment.from('2018-04-04', 'en', 'YYYY-MM-DD').format());// it would be in jalali system
// console.log(moment.from('1368/11/05', 'fa', 'YYYY/MM/DD').format())
console.log(new Date().toDateString())


console.log('================================')
m = moment(m.format('YYYY/MM/DD'), 'YYYY/MM/DDD');// parse a gregorian (miladi) date
console.log(m.locale('fa').format('YYYY/MM/DD')); // 1367/11/04)
console.log(m.format('jYYYYjMMjDD')); // 13671104)
console.log(moment('2021/02/04', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
console.log(moment('2021/02/04', 'YYYY/MM/DD').locale('fa').format('YYYYMMDD'))
console.log(moment(new Date(), 'YYYY/MM/DDD').locale('fa').format('YYYYMMDD'))


console.log('***************************')
console.log(m.format('YYYY/MM/DD'))

m = moment('1989/01/24', 'YYYY/MM/DDD');// parse a gregorian (miladi) date
console.log(m.format('jYYYY/jMM/jDD')); // 1367/11/04)
console.log(m.format('jYYYYjMMjDD')); // 13671104)






// parse jalali date
// m = moment('1367/11/04', 'jYYYY/jMM/jDD');
m = moment.from('1367/04/11', 'fa', 'YYYY/MM/DD');
// m = moment.from('04/1367/11', 'fa', 'DD/YYYY/MM');

console.log(moment.from('1367/11/04', 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')); // 1989/01/24


let q = new Date();
let month = q.getMonth();
let d = q.getDay();
let y = q.getFullYear()

console.log(new Date(y, month, d).toDateString())
console.log(new Date('2021-01-31 11:03:06.830').toDateString())


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

//today = mm + '/' + dd + '/' + yyyy;
today_ = dd + '/' + mm + '/' + yyyy;
console.log(Date.parse(today))
console.log(new Date(Date.parse(today)).toDateString())
console.log(new Date(Date.parse(today)).toDateString() === new Date(Date.parse('2021-01-31 11:03:06.830')).toDateString())
console.log(new Date().toDateString() === new Date(Date.parse('2021-01-31 11:03:06.830')).toDateString())

let fff = '13990511';
console.log(fff.substring(6,8))

console.log(moment(new Date(), 'YYYY/MM/DDD').locale('fa').format('YYYYMMDD'))