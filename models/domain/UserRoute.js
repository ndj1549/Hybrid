const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserRoute', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    },
    RouteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Routes',
        key: 'RouteID'
      }
    }
  }, {
    sequelize,
    tableName: 'UserRoute',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_UserRoute",
        unique: true,
        fields: [
          { name: "UserID" },
          { name: "RouteID" },
        ]
      },
    ]
  });
};
