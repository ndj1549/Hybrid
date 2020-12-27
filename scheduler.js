var schedule = require('node-schedule')
const axios = require('axios')

// var j = schedule.scheduleJob('* 1 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });



schedule.scheduleJob('5 * * * * *', function () {
    console.log('5 * * * * * ');
});



schedule.scheduleJob('0 32 13 * * *', function () {
    axios.get('http://localhost:5000/')
        .then(function (response) {
            // handle success
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        // .then(function () {
        //     // always executed
        // });
});

schedule.scheduleJob('0 55 12 * * *', function () {
    console.log('0 55 12 * * *');
});



