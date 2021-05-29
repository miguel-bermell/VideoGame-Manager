const gameRepository = require("../repositories/gameRepository");

exports.getAllGames = async () => {
  return await gameRepository.listGames();
};

exports.findGame = async (id) => {
  return await gameRepository.findGameById(id);
};

exports.createGame = async (game) => {
  if (!game.name || !game.price || !game.category) {
    throw new Error(
      "You must provide name, price and category in order to add a new Video Game"
    );
  }
  await gameRepository.insertGame(game);
};

exports.editGame = async (id, gameDetails) => {
  await gameRepository.updateGame(id, gameDetails);
};

exports.removeGame = async (id) => {
  if (!id) throw new Error("This game ID has not exist");
  await gameRepository.deleteGame(id);
};
