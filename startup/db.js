const sql = require('mssql')
const config = require('config')
const { Sequelize, Op, Model, DataTypes } = require("sequelize")


// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};


const DBconfig = {
    user: config.get("connStr.sql").user,
    password: config.get("connStr.sql").pass,
    server: config.get("connStr.sql").host,
    port:config.get("connStr.sql").port,
    database: config.get("connStr.sql").database
}


const sequelize = new Sequelize(DBconfig.database, DBconfig.user, DBconfig.password, {
    host: DBconfig.server,
    port: config.get("connStr.sql").port,
    dialect: config.get("connStr.sql").dialect,
    omitNull: true,
    dialectOptions: {
      options: {
        requestTimeout: 30000
      }
    },
  });



const poolPromise = new sql.ConnectionPool(DBconfig)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise, sequelize
}