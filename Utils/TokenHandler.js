const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const config = require('config')
const _ = require('lodash')

const { Sequelize, DataTypes, Op, ValidationError } = require("sequelize")
const { sequelize } = require('../startup/db')
const { MyErrorHandler } = require('./error')
// const { Users, RefTokenLogs } = require('../models/domain/init-models')(sequelize)
const DB = require('../models/domain/init-models')(sequelize)




const jwtSECRET_4_AccessToken = config.get('jwtSECRET_AccessToken');
const jwtSECRET_4_RefreshToken = config.get('jwtSECRET_RefreshToken');
const ACCESS_TOKEN_LIFETIME = config.get('ACCESS_TOKEN_LIFETIME')


const Create_Tokens = (inputUser) => {
    

    const token = Generate_AccessToken(inputUser);
    const refreshToken = jwt.sign({ t: randtoken.uid(32) }, jwtSECRET_4_RefreshToken + inputUser.Password, { expiresIn: "1d" }); // expire in  minutes
    //   exp: Math.floor(Date.now() / 1000) + (60 * 60)
    // is equivalent to { expiresIn: '1h' }
    // var refreshToken = randtoken.uid(256);        

    return Promise.all([token, refreshToken])
}


// const ReNew_AccessToken = async (tokenBody, refToken, refSecret) => {

//     const result = await DB.Users.findOne({
//         where: {
//             UserID: Number(tokenBody.ID)
//         }
//     })

//     if (!result) {
//         //throw new MyErrorHandler(404, 'User Not Found')
//         throw new MyErrorHandler(401, 'Invalid Token')
//     }

//     // Account Locked
//     if (!result.IsActive) {
//         throw new MyErrorHandler(403, 'Forbidden')
//     }

//     const tokenExists = await DB.RefTokenLogs.findOne({
//         where: {
//             [Op.and]: [
//                 { UserID: Number(tokenBody.ID) },
//                 { RefreshToken: refToken },
//                 { Valid: true }
//             ]
//         }
//     })

//     if (!tokenExists) {
//         throw new MyErrorHandler(401, 'Unauthorized, Login again please!')
//     }
//     //  else {
//     //     await DB.RefTokenLogs.update({ RefreshToken: 132 },{
//     //         where: {
//     //             [Op.and]:[
//     //                 { UserID: Number(tokenBody.ID) },
//     //                 { RefreshToken: refToken }
//     //             ]         
//     //         }
//     //     })
//     //     // await DB.RefTokenLogs.destroy({
//     //     //     where: {
//     //     //         [Op.and]: [
//     //     //             { RefreshToken: refToken },
//     //     //             { UserID: Number(tokenBody.ID) }
//     //     //         ]
//     //     //     },
//     //     //     transaction: tran1
//     //     // })
//     //     // const logRecord = await DB.RefTokenLogs.create({        
//     //     //     UserID: result.UserID,
//     //     //     RefreshToken: refreshToken,
//     //     //     Valid: true
//     //     // })
//     // }


//     const decoded = jwt.verify(refToken, refSecret + result.Password)

//     const token = jwt.sign(_.pick(tokenBody, ['ID', 'CID', 'PR']), jwtSECRET_4_AccessToken, { expiresIn: ACCESS_TOKEN_LIFETIME });
//     return token;

// }


const ReNew_AccessToken = async (accessToken, refToken) => {

    const tokenBody = jwt.decode(accessToken);

    const tokenExists = await DB.RefTokenLogs.findOne({
        where: {
            [Op.and]: [
                { UserID: Number(tokenBody.ID) },
                { RefreshToken: refToken },
                { Valid: true }
            ]
        }
    })

    if (!tokenExists) {
        throw new Error('ha ha ha ');
    }

    const _user = await DB.Users.findOne({
        where: {
            UserID: Number(tokenBody.ID)
        }
    })

    if (!_user) {
        throw new Error('ha ha ha ');
    }


    jwt.verify(refToken, jwtSECRET_4_RefreshToken + _user.Password)
    return Generate_AccessToken(_user)
    // let newTokenBody = {
    //     'ID': _user.UserID,
    //     'CID': _user.CenterID,
    //     'PR': _user.IsAdmin,
    // }
    // const token = await jwt.sign(newTokenBody, jwtSECRET_4_AccessToken, { expiresIn: ACCESS_TOKEN_LIFETIME });
    // return Promise.all([token, refreshToken]);
    // return Promise.resolve(token);
    // return [toekn, refreshToken]
    // return token
}


const Generate_AccessToken = (inputUser) => {
    var tokenBody = {
        'ID': inputUser.UserID,
        'CID': inputUser.CenterID,
        'PR': inputUser.IsAdmin,
    }
    return jwt.sign(tokenBody, jwtSECRET_4_AccessToken, { expiresIn: ACCESS_TOKEN_LIFETIME })
}


module.exports = {
    Create_Tokens,
    ReNew_AccessToken
}