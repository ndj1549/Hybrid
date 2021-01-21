const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RefTokenLogs', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RefreshToken: {
      type: DataTypes.STRING(300),
      allowNull: false,
      primaryKey: true
    },
    Valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    LastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'RefTokenLogs',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_RefTokenLogs",
        unique: true,
        fields: [
          { name: "UserID" },
          { name: "RefreshToken" },
        ]
      },
    ]
  });
};
