const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('City', {
    CityID: {
      autoIncrement: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    OstanID: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'Ostan',
        key: 'OstanID'
      }
    },
    CityName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CityLat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CityLong: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'City',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_City",
        unique: true,
        fields: [
          { name: "CityID" },
        ]
      },
    ]
  });
};
