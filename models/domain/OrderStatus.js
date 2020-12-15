const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderStatus', {
    StatusID: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    StatusName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OrderStatus',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_OrderStatus",
        unique: true,
        fields: [
          { name: "StatusID" },
        ]
      },
    ]
  });
};
