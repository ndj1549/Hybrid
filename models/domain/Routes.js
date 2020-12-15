const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Routes', {
    RouteID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CityID: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    RouteName: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Routes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Routes",
        unique: true,
        fields: [
          { name: "RouteID" },
        ]
      },
    ]
  });
};
