
var schedule = require('node-schedule')
const { SYNC_SQL_WITH_ORA_Products,
        SYNC_SQL_WITH_ORA_Centers,
        SYNC_SQL_WITH_ORA_CustomerMandeEtebar } = require('./scheduler')



schedule.scheduleJob('* * * * * *', function () {

    console.log(new Date().toLocaleTimeString())
});


schedule.scheduleJob('20 33 12 * * *', function () {
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


schedule.scheduleJob('10 14 10 * * *', function() {
    SYNC_SQL_WITH_ORA_Centers()
})



schedule.scheduleJob('0 31 14 * * *', function() {
    SYNC_SQL_WITH_ORA_CustomerMandeEtebar()
})


// schedule.scheduleJob('* * * * * *', function() {
//     SYNC_SQL_WITH_ORA_Customers()
// })



