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


var now = new Date()
//console.log(now.getHours())    
console.log(new Date().toTimeString())
console.log(new Date().toLocaleString())
console.log(new Date().toLocaleTimeString())