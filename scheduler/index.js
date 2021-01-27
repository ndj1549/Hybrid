
var schedule = require('node-schedule')



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
});


schedule.scheduleJob('10 51 13 * * *', function () {
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


schedule.scheduleJob('10 14 10 * * *', function () {
    SYNC_SQL_WITH_ORA_Centers()
})



schedule.scheduleJob('0 31 14 * * *', function () {
    SYNC_SQL_WITH_ORA_CustomerMandeEtebar()
})


schedule.scheduleJob('20 33 11 * * *', function() {
    SYNC_SQL_WITH_ORA_Customers()
})

schedule.scheduleJob('20 50 13 * * *', function() {
    DELETE_Expired_Token_Logs()
})


