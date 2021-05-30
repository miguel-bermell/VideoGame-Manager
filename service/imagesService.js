const imagesRepository = require("../repositories/imagesRespository");

exports.getAllImages = async () => {
  return await imagesRepository.listImages();
};
