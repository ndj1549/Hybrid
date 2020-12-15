const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    CustomerID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    CustomerName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CutomerFamily: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CityID: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'City',
        key: 'CityID'
      }
    },
    PanelTitle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    RouteID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Routes',
        key: 'RouteID'
      }
    },
    Latitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Longitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customers',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Customers",
        unique: true,
        fields: [
          { name: "CustomerID" },
        ]
      },
    ]
  });
};
