const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('V_OstanCity', {
    OstanName: {
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
    CityID: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    OstanID: {
      type: DataTypes.TINYINT,
      allowNull: false
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
    tableName: 'V_OstanCity',
    schema: 'dbo',
    timestamps: false
  });
};
