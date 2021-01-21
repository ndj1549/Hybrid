const jwt = require('jsonwebtoken')
const config = require('config')
const tokenHandler = require('../Utils/TokenHandler')

module.exports = async (req, res, next) => {

    // const authHeader = req.headers['x-auth-token'];
    // const token = authHeader && authHeader.split(' ')[1];

    var token = req.headers['x-auth-token'];
    // var refresh_token = req.headers['x-auth-refreshtoken'];

    if (!token)
        return res.status(400).send('Access Denied, No token provided');

    try {
        if (jwt.decode(token).exp < Math.floor(Date.now() / 1000)) {
            // Let's renew the token
            //token = await tokenHandler.ReNew_AccessToken(jwt.decode(token), req.headers['x-auth-refreshtoken'], config.get('jwtSECRET_RefreshToken'))
            res.status(401).send('Token Expired');   
            return; 
        }
        const decoded = jwt.verify(token, config.get('jwtSECRET_AccessToken'));
        console.log('TOKEN DECODED: ' + JSON.stringify(decoded));
        // {"ID":2,"CID":760100,"PR":false,"iat":1610960158,"exp":1610960218}
        req.user = decoded; // this decoded is the payload object embedded in the token upon creation
        
        next()
    } catch (ex) {
        console.log(ex);
        
        res.status(401).send('Invalid Token');
    } finally {
        // res.set('x-auth-token', token)
        // res.set('x-auth-refreshtoken', refresh_token)
    }

}