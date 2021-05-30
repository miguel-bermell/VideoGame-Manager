const dbConnection = require("../config/db");
const Videogame = require("./videogame");
const Image = require("./Image");
const loadModels = () => {
  Image.hasMany(Videogame, {
    foreignKey: {
      allowNull: false,
    },
  });
  Videogame.belongsTo(Image);
  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
