const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Image = dbConnection.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Image;
