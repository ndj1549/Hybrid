var DataTypes = require("sequelize").DataTypes;
var _Category = require("./Category");
var _City = require("./City");
var _Customers = require("./Customers");
var _OrderDetails = require("./OrderDetails");
var _OrderStatus = require("./OrderStatus");
var _Orders = require("./Orders");
var _Ostan = require("./Ostan");
var _Packages = require("./Packages");
var _ProductImage = require("./ProductImage");
var _Product_Package = require("./Product_Package");
var _Product_Repository = require("./Product_Repository");
var _Products = require("./Products");
var _Routes = require("./Routes");
var _UserRoute = require("./UserRoute");
var _Users = require("./Users");
var _V_OstanCity = require("./V_OstanCity");

function initModels(sequelize) {
  var Category = _Category(sequelize, DataTypes);
  var City = _City(sequelize, DataTypes);
  var Customers = _Customers(sequelize, DataTypes);
  var OrderDetails = _OrderDetails(sequelize, DataTypes);
  var OrderStatus = _OrderStatus(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Ostan = _Ostan(sequelize, DataTypes);
  var Packages = _Packages(sequelize, DataTypes);
  var ProductImage = _ProductImage(sequelize, DataTypes);
  var Product_Package = _Product_Package(sequelize, DataTypes);
  var Product_Repository = _Product_Repository(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Routes = _Routes(sequelize, DataTypes);
  var UserRoute = _UserRoute(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var V_OstanCity = _V_OstanCity(sequelize, DataTypes);

  Products.belongsToMany(Packages, { through: Product_Package, foreignKey: "ProductIDOra", otherKey: "PackageID" });
  Packages.belongsToMany(Products, { through: Product_Package, foreignKey: "PackageID", otherKey: "ProductIDOra" });
  Users.belongsToMany(Routes, { through: UserRoute, foreignKey: "UserID", otherKey: "RouteID" });
  Routes.belongsToMany(Users, { through: UserRoute, foreignKey: "RouteID", otherKey: "UserID" });
  City.belongsTo(Ostan, { foreignKey: "OstanID_Ora"});
  Ostan.hasMany(City, { foreignKey: "OstanID_Ora"});
  Customers.belongsTo(City, { foreignKey: "CityID"});
  City.hasMany(Customers, { foreignKey: "CityID"});
  OrderDetails.belongsTo(Orders, { foreignKey: "OrderID"});
  Orders.hasMany(OrderDetails, { foreignKey: "OrderID"});
  Orders.belongsTo(OrderStatus, { foreignKey: "OrderStatusID"});
  OrderStatus.hasMany(Orders, { foreignKey: "OrderStatusID"});
  ProductImage.belongsTo(Product_Repository, { foreignKey: "ProductIDOraFK"});
  Product_Repository.hasMany(ProductImage, { foreignKey: "ProductIDOraFK"});
  Product_Package.belongsTo(Packages, { foreignKey: "PackageID"});
  Packages.hasMany(Product_Package, { foreignKey: "PackageID"});
  Product_Package.belongsTo(Products, { foreignKey: "ProductIDOra"});
  Products.hasMany(Product_Package, { foreignKey: "ProductIDOra"});
  Products.belongsTo(Category, { foreignKey: "CategoryID"});
  Category.hasMany(Products, { foreignKey: "CategoryID"});
  UserRoute.belongsTo(Routes, { foreignKey: "RouteID"});
  Routes.hasMany(UserRoute, { foreignKey: "RouteID"});
  UserRoute.belongsTo(Users, { foreignKey: "UserID"});
  Users.hasMany(UserRoute, { foreignKey: "UserID"});

  return {
    Category,
    City,
    Customers,
    OrderDetails,
    OrderStatus,
    Orders,
    Ostan,
    Packages,
    ProductImage,
    Product_Package,
    Product_Repository,
    Products,
    Routes,
    UserRoute,
    Users,
    V_OstanCity,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
