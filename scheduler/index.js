
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, `../env/.env.scheduler`)}); 
// require('dotenv').config({ path: `../env/.env.scheduler` })
// require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
var schedule = require('node-schedule')

process.env.TZ = 'Asia/Tehran';


// '* * * * * *' - runs every second
// '*/5 * * * * *' - runs every 5 seconds
// '10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
// '0 * * * * *' - runs every minute
// '0 0 * * * *' - runs every hour (at 0 minutes and 0 seconds)
// 0 */10 * * * * - runs every 10 minutes
// 0 0 */2 * * * - every 2 hours

const { SYNC_SQL_WITH_ORA_Products,
    SYNC_SQL_WITH_ORA_Customers,
    SYNC_SQL_WITH_ORA_Centers,
    SYNC_SQL_WITH_ORA_CustomerMandeEtebar,
    DELETE_Expired_Token_Logs } = require('./scheduler')



var rule = new schedule.RecurrenceRule();
rule.hour = 2; // 6
rule.minute = 0;
schedule.scheduleJob(rule, function () {

    DELETE_Expired_Token_Logs()

});






schedule.scheduleJob('* * * * * *', function () {

    console.log(new Date().toLocaleTimeString())
    // console.log(`${process.env.BaseAddress}:${process.env.BasePORT}`)
    console.log(process.env.CallRate_4_Products)
});


schedule.scheduleJob(process.env.CallRate_4_Products, function () {
    // axios.get('http://localhost:5000/')
    //     .then(function (response) {
    //         // handle success
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    //     // .then(function () {
    //     //     // always executed
    //     // });

    SYNC_SQL_WITH_ORA_Products()
});


schedule.scheduleJob(process.env.CallRate_4_Centers, function () {
    SYNC_SQL_WITH_ORA_Centers()
})



schedule.scheduleJob(process.env.CallRate_4_CustomersMandeEtebar, function () {
    SYNC_SQL_WITH_ORA_CustomerMandeEtebar()
})


schedule.scheduleJob(process.env.CallRate_4_Customers, function() {
    SYNC_SQL_WITH_ORA_Customers()
})

schedule.scheduleJob(process.env.CallRate_4_ClearTokens, function() {
    DELETE_Expired_Token_Logs()
})


