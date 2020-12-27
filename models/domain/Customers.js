const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    CustomerID_TFOra: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    CustomerID: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    CenterID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Centers',
        key: 'CenterID_Ora'
      }
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
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'City',
        key: 'CityID_Ora'
      }
    },
    PanelTitle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Latitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Longitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MandeEtebar: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customers',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Customers_1",
        unique: true,
        fields: [
          { name: "CustomerID_TFOra" },
        ]
      },
    ]
  });
};
