const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const config = require('config')


const jwtSECRET_4_AccessToken = config.get('jwtSECRET_AccessToken');
const jwtSECRET_4_RefreshToken = config.get('jwtSECRET_RefreshToken');



const Create_Tokens = (result) => {
    var tokenBody = {
        'ID': result.UserID, 
        'CID': result.CenterID,
        'PR': result.IsAdmin,
    }

    const token = jwt.sign(tokenBody, jwtSECRET_4_AccessToken, { expiresIn: "7d" }); // expire in 5 minutes
    const refreshToken = jwt.sign({t: randtoken.uid(32)+result.Password  }, jwtSECRET_4_RefreshToken, { expiresIn:"7d" }); // expire in  minutes
    //   exp: Math.floor(Date.now() / 1000) + (60 * 60)
    // is equivalent to { expiresIn: '1h' }
    // var refreshToken = randtoken.uid(256);        

    return [token, refreshToken]
}


const ReNew_Tokens = () => {
    
}


module.exports = {
    Create_Tokens,
    ReNew_Tokens
}