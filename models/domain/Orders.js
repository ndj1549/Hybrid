const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    OrderID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    CustomerID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ShippedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ShipCity: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ShipAddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Tonage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    OrderStatusID: {
      type: DataTypes.TINYINT,
      allowNull: true,
      references: {
        model: 'OrderStatus',
        key: 'StatusID'
      }
    }
  }, {
    sequelize,
    tableName: 'Orders',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Orders",
        unique: true,
        fields: [
          { name: "OrderID" },
        ]
      },
    ]
  });
};