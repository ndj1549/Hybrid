const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderDetails', {
    OrderDetID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    OrderID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Orders',
        key: 'OrderID'
      }
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    QuantityConfirmed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    Discount: {
      type: DataTypes.REAL,
      allowNull: true
    },
    Tonage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PackgID: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    InsertTimestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'OrderDetails',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_OrderDetails",
        unique: true,
        fields: [
          { name: "OrderDetID" },
        ]
      },
    ]
  });
};
