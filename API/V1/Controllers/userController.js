const jwt = require('jsonwebtoken')
const { MyErrorHandler } = require('../../../Utils/error')
const { Sequelize, DataTypes, Op } = require("sequelize")
const { sequelize } = require('../../../startup/db')
// const _ = require('lodash')
// const moment = require('jalali-moment')

const sign_in = async () => {

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
    Reject_UserToken
}
