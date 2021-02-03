const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    OrderID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      //defaultValue: NEXT VALUE FOR [dbo].[Sequence_OrderID],
      primaryKey: true
    },
    CustomerID_TFOra: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('getdate')
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
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'OrderStatus',
        key: 'StatusID'
      }
    },
    OracleRead: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    TrackingCode: {
      type: DataTypes.BIGINT,
      allowNull: true,
      //defaultValue: NEXT VALUE FOR [dbo].[Sequence_OrderTrackingCode]
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
