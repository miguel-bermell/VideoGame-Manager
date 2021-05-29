const dbConnection = require("../config/db");
const Videogame = require("./videogame");

const loadModels = () => {
  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
