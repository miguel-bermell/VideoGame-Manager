const Videogame = require("../models/videogame");

exports.insertGame = async (game) => {
  return await Videogame.create(game);
};

exports.listGames = async () => {
  return await Videogame.findAll({ order: [["createdAt", "DESC"]] });
};

exports.findGameById = async (id) => {
  return Videogame.findOne({ where: { id } });
};

exports.updateGame = async (id, gameDetails) => {
  return await Videogame.update(gameDetails, { where: { id } });
};

exports.deleteGame = async (id) => {
  return await Videogame.destroy({ where: { id } });
};
