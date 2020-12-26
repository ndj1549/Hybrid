const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product_Repository', {
    ProductIDOra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Mojudi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    Discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Category_L1_ID: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Category_L1_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Display: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    PackageIDOra: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    PackageName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PackageQuantity: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    PackageWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    LastUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Product_Repository',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Product_Repository",
        unique: true,
        fields: [
          { name: "ProductIDOra" },
        ]
      },
    ]
  });
};
