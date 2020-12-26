const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductImage', {
    ImageID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProductIDOraFK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Product_Repository',
        key: 'ProductIDOra'
      }
    },
    ImgPath: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ThumbPath: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ProductImage',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_ProductImage",
        unique: true,
        fields: [
          { name: "ImageID" },
        ]
      },
    ]
  });
};
