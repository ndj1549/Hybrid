const { v4: uuidv4 } = require('uuid');



module.exports.generate = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    const DAY = Math.floor(diff / oneDay);
    const YEAR = now.getFullYear().toString().substring(2, 4);

    TimeStr = 'ABCDEFGHIJKLMNPQRSTUVWYZ';
    // console.log('char for hour: ' + TimeStr[parseInt(now.getHours())])
    const HourCharacter = TimeStr[parseInt(now.getHours())]

    const RANDOM_4 = uuidv4().substring(9, 13)
    const strBase = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ!@#$&*123456789";
    const MinuteCharacter = strBase[parseInt(now.getMinutes())]
    //Math.floor(Math.random() * 10) + 1;  // returns a random integer from 1 to 10 
    // console.log(Math.floor(Math.random() * 63))
    const RandomChar = strBase[Math.floor(Math.random() * 63)]    
    // console.log(YEAR + '-' + DAY + '/' + HourCharacter + MinuteCharacter + RANDOM_4 + RandomChar)

    return YEAR + '-' + DAY + '/' + HourCharacter + MinuteCharacter + RANDOM_4 + RandomChar;
}