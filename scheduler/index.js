
var schedule = require('node-schedule')

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






schedule.scheduleJob('5 * * * * *', function () {

    console.log(new Date().toLocaleTimeString())
});


schedule.scheduleJob('10 02 02 * * *', function () {
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


schedule.scheduleJob('10 25 02 * * *', function () {
    SYNC_SQL_WITH_ORA_Centers()
})



schedule.scheduleJob('0 30 02 * * *', function () {
    SYNC_SQL_WITH_ORA_CustomerMandeEtebar()
})


schedule.scheduleJob('0 45 02 * * *', function() {
    SYNC_SQL_WITH_ORA_Customers()
})

schedule.scheduleJob('0 0 */2 * * *', function() {
    DELETE_Expired_Token_Logs()
})


