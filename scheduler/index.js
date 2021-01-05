
var schedule = require('node-schedule')

// runs once a minute, when the second = 5
// schedule.scheduleJob('5 * * * * *', function () {
//     console.log('5 * * * * * ');
// });



// schedule.scheduleJob('0 32 13 * * *', function () {
//     axios.get('http://localhost:5000/')
//         .then(function (response) {
//             // handle success
//             console.log(response.data);
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
//         // .then(function () {
//         //     // always executed
//         // });
// });


const { SYNC_SQL_WITH_ORA_Products, SYNC_SQL_WITH_ORA_Centers } = require('./scheduler')

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


schedule.scheduleJob('10 47 09 * * *', function() {
    SYNC_SQL_WITH_ORA_Centers()
})



