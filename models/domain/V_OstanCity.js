const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('V_OstanCity', {
    CityID_Ora: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OstanID_Ora: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    CityName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
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
    }
  }, {
    sequelize,
    tableName: 'V_OstanCity',
    schema: 'dbo',
    timestamps: false
  });
};
