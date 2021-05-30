export class Videogame {
  constructor(id, name, price, category, genre, ImageId) {
    if (id) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.genre = genre;
      this.ImageId = ImageId;
    } else {
      this.name = name;
      this.price = price;
      this.category = category;
      this.genre = genre;
      this.ImageId = ImageId;
    }
  }

  getCategoryText(data) {
    let text = "Error";

    switch (data) {
      case Videogame.CAT_XBOX:
        text = "XBOX 360";
        break;
      case Videogame.CAT_PS5:
        text = "PS5";
        break;
      case Videogame.CAT_SWITCH:
        text = "Switch";
        break;
      case Videogame.CAT_PC:
        text = "PC";
        break;
    }
    return text;
  }

  getGenreText(data) {
    let text = "Error";

    switch (data) {
      case Videogame.GEN_ACTION:
        text = "ACCIÓN";
        break;
      case Videogame.GEN_PLATFORM:
        text = "PLATAFORMAS";
        break;
      case Videogame.GEN_FPS:
        text = "FPS";
        break;
    }
    return text;
  }
}

Videogame.CAT_XBOX = 1;
Videogame.CAT_PS5 = 2;
Videogame.CAT_SWITCH = 3;
Videogame.CAT_PC = 4;

Videogame.GEN_ACTION = 1;
Videogame.GEN_PLATFORM = 2;
Videogame.GEN_FPS = 3;

Videogame.STATUS_AVAILABLE = 1;
Videogame.STATUS_RENTED = 2;
Videogame.STATUS_SOLD = 3;
