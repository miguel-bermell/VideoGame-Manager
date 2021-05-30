const Image = require("../models/Image");

exports.listImages = async () => {
  return await Image.findAll();
};
