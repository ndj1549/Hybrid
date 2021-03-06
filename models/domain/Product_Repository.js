const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product_Repository', {
    PRODUCTIDORA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CENTERID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TITLE: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MOJUDI: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    VAHED: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MAX_ORDER_CAPACITY: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1000
    },
    PRICE: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    DISCOUNT: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    CATEGORY_L1_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CATEGORY_L1_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DISPLAY: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    PACKAGEIDORA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PACKAGENAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PACKAGEQUANTITY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PACKAGEWEIGHT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TAX: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    AFZOODE: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    AVAREZ: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    LASTUPDATE: {
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
          { name: "PRODUCTIDORA" },
          { name: "CENTERID" },
        ]
      },
    ]
  });
};
