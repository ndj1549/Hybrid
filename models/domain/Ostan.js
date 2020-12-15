const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ostan', {
    OstanID: {
      autoIncrement: true,
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
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
    tableName: 'Ostan',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Ostan",
        unique: true,
        fields: [
          { name: "OstanID" },
        ]
      },
    ]
  });
};
