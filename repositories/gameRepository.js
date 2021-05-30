const Videogame = require("../models/videogame");
const Image = require("../models/Image");
exports.insertGame = async (game) => {
  return await Videogame.create(game);
};

exports.listGames = async () => {
  return await Videogame.findAll({
    order: [["updatedAt", "DESC"]],
    include: {
      model: Image,
    },
  });
};

exports.listGamesByPriceASC = async () => {
  return await Videogame.findAll({
    include: {
      model: Image,
      order: [["price", "ASC"]],
    },
  });
};

exports.listGamesByPriceDESC = async () => {
  return await Videogame.findAll({
    order: [["price", "DESC"]],
    include: {
      model: Image,
    },
  });
};

//({ order: [["createdAt", "DESC"]] });
exports.findGameById = async (id) => {
  return Videogame.findOne({ where: { id } });
};

exports.updateGame = async (id, gameDetails) => {
  return await Videogame.update(gameDetails, { where: { id } });
};

exports.deleteGame = async (id) => {
  return await Videogame.destroy({ where: { id } });
};
