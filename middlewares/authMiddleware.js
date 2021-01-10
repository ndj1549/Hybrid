const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    // const authHeader = req.headers['x-auth-token'];
    // const token = authHeader && authHeader.split(' ')[1];

    const token = req.headers['x-auth-token'];

    if (!token)
        return res.status(400).send('Access Denied, No token provided');

        try {
            const decoded = jwt.verify(token, config.get('jwtSECRET_AccessToken'));
            console.log('TOKEN DECODED: ' + JSON.stringify(decoded));
            req.user = decoded; // this decoded is the payload object embedded in the token upon creation
            next();
        } catch (ex) {
            console.log(ex);
            res.status(401).send('Invalid Token');
        }

}