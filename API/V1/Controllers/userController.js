const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes, Op } = require("sequelize")
const { sequelize } = require('../../../startup/db')
const _ = require('lodash')
const tokenHandler = require('../../../Utils/TokenHandler')
// const moment = require('jalali-moment')


const DB = require('../../../models/domain/init-models')(sequelize)




const sign_in = async (req, res, next) => {
    try {
        // validate user input
        // 400 Bad request
        const result = await DB.Users.findOne({
            where: {
                Username: req.body.Username
            }
        })

        if (!result || result.Password !== req.body.Password) {
            //throw new MyErrorHandler(404, 'User Not Found')
            throw new MyErrorHandler(400, 'Invalid User/Pass')
        }

        // Account Locked
        if (!result.IsActive) {
            throw new MyErrorHandler(403, 'Forbidden')
        }

        const [token, refreshToken] = await tokenHandler.Create_Tokens(result)

        const logRecord = await DB.RefTokenLogs.create({
            UserID: result.UserID,
            RefreshToken: refreshToken,
            Valid: true
        })

        // res.header('x-auth-token', token);
        // res.header('x-auth-refreshtoken', refreshToken);
        //res.json({ token: 'JWT ' + token, refreshToken: refreshToken })        
        
        res.json({ ACCESS_TOKEN: token, REFRESH_TOKEN: refreshToken })

    } catch (err) {
        next(err)
    }
}

const sign_up = async () => {

}

const Toggle_Account_Enable = async () => {

}

const Edit_Account = async () => {

}

const List_UserAccounts = async () => {

}

const Get_Account_By_UserID = async () => {

}


const myProfile = async (req, res) => {
    // the AuthMiddleware will decode the jwt token and extract user into req.user
    res.status(200).send(req.user);
}


// In an application in which a user can be working from different devices, 
// with a single identity (same username) but with different tokens on each device, 
// if one of these is lost or stolen, this method would allow the administrator to delete or disable
// the refresh token in question without the user being left without service on the other devices. 

//  In this case we simply deleted it from our list in memory. 
// In a complete implementation it would be necessary to verify that 
//the user who makes the request is an administrator or has the permissions for this resource.
const Reject_UserToken = async () => {

}


const ReNew_Token = async (req, res, next) => {
    console.log(req.body.refreshToken)

    try {
        // const [token, refreshToken] = await tokenHandler.ReNew_AccessToken(req.body.accessToken, req.body.refreshToken)
        const token = await tokenHandler.ReNew_AccessToken(req.body.accessToken, req.body.refreshToken)
        res.json({ ACCESS_TOKEN: token, REFRESH_TOKEN: req.body.refreshToken })
    } catch(err){
        res.status(500).send(err)
    } finally {
        // res.set('x-auth-token', accToken)
        // res.set('x-auth-refreshtoken', req.body.refreshToken)
    }
}



module.exports = {
    sign_in,
    sign_up,
    Toggle_Account_Enable,
    Edit_Account,
    List_UserAccounts,
    Get_Account_By_UserID,
    Reject_UserToken,
    myProfile,
    ReNew_Token
}
