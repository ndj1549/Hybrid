const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: true
    },
    HireDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PhotoPath: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Mobile: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    IsAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    CodeMelli: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Users",
        unique: true,
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
};
