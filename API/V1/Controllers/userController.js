const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes, Op } = require("sequelize")
const { sequelize } = require('../../../startup/db')
const _ = require('lodash')
const tokenHandler = require('../../../Utils/TokenHandler')
// const moment = require('jalali-moment')


const { Users } = require('../../../models/domain/init-models')(sequelize)




const sign_in = async (req, res, next) => {
    try {
        // validate user input
        // 400 Bad request
        const result = await Users.findOne({
            where: {
                Username: req.body.Username
            }
        })

        if (!result || result.Password !== req.body.Password) {
            //throw new MyErrorHandler(404, 'User Not Found')
            throw new MyErrorHandler(400, 'Invalid User/Pass')
        }

        // Account Locked
        if(! result.IsActive) {
            throw new MyErrorHandler(403, 'Forbidden')
        }

        const [token, refreshToken] = tokenHandler.Create_Tokens(result)

        
        //res.json({ token: 'JWT ' + token, refreshToken: refreshToken })
        res.json({ token: token, refreshToken: refreshToken })


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


module.exports = {
    sign_in,
    sign_up,
    Toggle_Account_Enable,
    Edit_Account,
    List_UserAccounts,
    Get_Account_By_UserID,
    Reject_UserToken,
    myProfile
}
