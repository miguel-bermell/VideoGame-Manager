var express = require("express");
var router = express.Router();
const gameService = require("../service/gameService");

router.get("/all", async (req, res, next) => {
  try {
    const games = await gameService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await gameService.findGame(id);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    await gameService.createGame(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await gameService.editGame(id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await gameService.removeGame(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
