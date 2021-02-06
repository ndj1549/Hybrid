const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    OrderID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      // defaultValue: NEXT VALUE FOR [dbo].[Sequence_OrderID],
      primaryKey: true
    },
    OrderType: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    WhichOrderID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Orders',
        key: 'OrderID'
      }
    },
    CustomerID_TFOra: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('getdate')
    },
    IntOrderDate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ShippedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ShipCity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ShipAddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    OrderStatusID: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'OrderStatus',
        key: 'StatusID'
      }
    },
    OracleRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    TrackingCode: {
      type: DataTypes.BIGINT,
      allowNull: true,
      // defaultValue: NEXT VALUE FOR [dbo].[Sequence_OrderTrackingCode]
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
