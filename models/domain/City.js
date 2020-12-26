const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('City', {
    CityID_Ora: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    OstanID_Ora: {
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
          { name: "CityID_Ora" },
        ]
      },
    ]
  });
};
