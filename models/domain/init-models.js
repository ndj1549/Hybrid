var DataTypes = require("sequelize").DataTypes;
var _Centers = require("./Centers");
var _City = require("./City");
var _Customers = require("./Customers");
var _OrderDetails = require("./OrderDetails");
var _OrderStatus = require("./OrderStatus");
var _Orders = require("./Orders");
var _Ostan = require("./Ostan");
var _Product_Repository = require("./Product_Repository");
var _Users = require("./Users");
var _V_OstanCity = require("./V_OstanCity");

function initModels(sequelize) {
  var Centers = _Centers(sequelize, DataTypes);
  var City = _City(sequelize, DataTypes);
  var Customers = _Customers(sequelize, DataTypes);
  var OrderDetails = _OrderDetails(sequelize, DataTypes);
  var OrderStatus = _OrderStatus(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Ostan = _Ostan(sequelize, DataTypes);
  var Product_Repository = _Product_Repository(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var V_OstanCity = _V_OstanCity(sequelize, DataTypes);

  City.belongsTo(Ostan, { foreignKey: "OstanID_Ora"});
  Ostan.hasMany(City, { foreignKey: "OstanID_Ora"});
  Customers.belongsTo(Centers, { foreignKey: "CenterID"});
  Centers.hasMany(Customers, { foreignKey: "CenterID"});
  Customers.belongsTo(City, { foreignKey: "CityID"});
  City.hasMany(Customers, { foreignKey: "CityID"});
  OrderDetails.belongsTo(Orders, { foreignKey: "OrderID"});
  Orders.hasMany(OrderDetails, { foreignKey: "OrderID"});
  Orders.belongsTo(OrderStatus, { foreignKey: "OrderStatusID"});
  OrderStatus.hasMany(Orders, { foreignKey: "OrderStatusID"});
  Users.belongsTo(Centers, { foreignKey: "CenterID"});
  Centers.hasMany(Users, { foreignKey: "CenterID"});

  return {
    Centers,
    City,
    Customers,
    OrderDetails,
    OrderStatus,
    Orders,
    Ostan,
    Product_Repository,
    Users,
    V_OstanCity,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
