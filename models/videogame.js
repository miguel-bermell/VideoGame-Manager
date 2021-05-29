const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Videogame = dbConnection.define("Game", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(70),
  },
  price: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(30),
  },
  genre: {
    type: DataTypes.STRING(30),
  },
});

module.exports = Videogame;
