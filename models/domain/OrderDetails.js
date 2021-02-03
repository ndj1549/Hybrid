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
    PackSize: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PackgID: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Discount: {
      type: DataTypes.REAL,
      allowNull: true
    },
    Tonage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Price_SingleItem: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    TotalPrice_AfterTax: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Tax: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Afzoode: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Avarez: {
      type: DataTypes.TINYINT,
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
