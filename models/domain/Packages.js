const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Packages', {
    PackageID: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    PackageName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Quantity: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Packages',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Packages",
        unique: true,
        fields: [
          { name: "PackageID" },
        ]
      },
    ]
  });
};
