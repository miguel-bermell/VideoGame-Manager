var express = require("express");
var router = express.Router();
const imagesService = require("../service/imagesService");

router.get("/all", async (req, res, next) => {
  try {
    const images = await imagesService.getAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
