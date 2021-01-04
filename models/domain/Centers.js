const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Centers', {
    CenterID_Ora: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CenterName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LastUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Centers',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Centers",
        unique: true,
        fields: [
          { name: "CenterID_Ora" },
        ]
      },
    ]
  });
};
