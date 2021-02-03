module.exports = (req, res, next) => {

    var startPoint = "02:00:00",
    finishPoint = "02:55:00";

    var _now = new Date().toLocaleTimeString()

    if( _now > startPoint && _now < finishPoint) {
        res.status(503).send('Service Unavailable during 02:00 AM to 03:00 AM')
    } else {
        next()        
    }
}