module.exports = (req, res, next) => {

    if(req.user.IsAdmin ) {
        next()
    } else{
        res.status(403).send('Not enough permission, Access Denied')
    }

}