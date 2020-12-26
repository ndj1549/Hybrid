const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    ProductIDOra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Subtitle: {
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
    Big_Image_Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Small_Image_Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'CategoryID'
      }
    },
    Display: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    LastUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Products',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Products",
        unique: true,
        fields: [
          { name: "ProductIDOra" },
        ]
      },
    ]
  });
};
