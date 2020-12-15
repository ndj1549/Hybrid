const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product_Package', {
    ProductIDOra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'ProductIDOra'
      }
    },
    PackageID: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Packages',
        key: 'PackageID'
      }
    },
    Weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Product_Package',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Product_Package",
        unique: true,
        fields: [
          { name: "ProductIDOra" },
          { name: "PackageID" },
        ]
      },
    ]
  });
};
