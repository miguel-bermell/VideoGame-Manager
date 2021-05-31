import { Videogame } from "./models/Videogame.js";
import { INPUT, ALERT } from "./utils/constants.js";
import { orderByAsc, orderByDesc } from "./utils/functions.js";
import { removeClass, alertTime } from "./utils/validations.js";

document.addEventListener("DOMContentLoaded", () => {
  getGames();
  resetForm();
  orderByPrice();
  getImages();
});

const createGame = () => {
  if (!INPUT.name.value || !INPUT.price.value || INPUT.selectImg.value == 0) {
    INPUT.name.classList.add("alert");
    INPUT.price.classList.add("alert");
    INPUT.selectImg.classList.add("alert");
    INPUT.alert.classList.add("red");
    return (INPUT.alert.innerText = ALERT.alert1);
  }
  removeClass(INPUT.alert, "red");
  INPUT.alert.innerText = ALERT.alert3;
  alertTime(INPUT.alert);

  const game = new Videogame(
    null,
    INPUT.name.value,
    +INPUT.price.value,
    +INPUT.category.value,
    +INPUT.genre.value,
    +INPUT.selectImg.value
  );
  console.log(game);
  INPUT.form.reset();
  insertGame(game);
};

const insertGame = async (game) => {
  // PREGUNTAR A JAVI

  await fetch("http://localhost:3000/videogames", {
    method: "POST",
    body: JSON.stringify(game),
    headers: {
      "Content-type": "application/json",
    },
  }).then(await console.log);

  await clearHTML();
  await getGames();
};

const getImages = () => {
  fetch("http://localhost:3000/images/all")
    .then((response) => response.json())
    .then((results) => {
      insertImages(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const insertImages = (images) => {
  const container = INPUT.selectImg;
  let optionDefault = `<option value="0" selected disabled hidden>Selecciona imagen</option>`;
  const data = images
    .map((img) => {
      return `
            <option value="${img.id}"> ${img.name} </option>
            `;
    })
    .join(" ");
  optionDefault += data;
  container.innerHTML = optionDefault;
};

const getGames = () => {
  fetch("http://localhost:3000/videogames/all")
    .then((response) => response.json())
    .then((results) => {
      paintGames(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getGame = (id) => {
  fetch(`http://localhost:3000/videogames/${id}`)
    .then((response) => response.json())
    .then((results) => {
      editVg(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteGame = (id) => {
  fetch(`http://localhost:3000/videogames/${id}`, {
    method: "DELETE",
    body: null,
    headers: {
      "Content-type": "application/json",
    },
  }).then(console.log);
  document.getElementById(id).remove();
};

const editVg = (game) => {
  console.log(game);
  INPUT.name.value = game.name;
  INPUT.price.value = game.price;
  INPUT.category.value = game.category;
  INPUT.genre.value = game.genre;
  INPUT.selectImg.value = game.ImageId;
  INPUT.btn.classList.add("d-none");
  INPUT.btnEdit.classList.add("d-block");
  INPUT.btnClose.classList.add("d-block");
  INPUT.name.style.color = "#061aff";
  INPUT.price.style.color = "#061aff";

  INPUT.btnEdit.addEventListener("click", () => {
    updateGame(game.id);
    console.log(game.id);
  });
  INPUT.btnClose.addEventListener("click", () => {
    INPUT.form.reset();
    updateGameAlers();
  });
};
//Revisar esta función
const updateGame = async (id) => {
  console.log(id);
  if (!INPUT.name.value || !INPUT.price.value) {
    INPUT.name.classList.add("alert");
    INPUT.price.classList.add("alert");
    INPUT.alert.classList.add("red");
    return (INPUT.alert.innerText = ALERT.alert1);
  }

  const editGame = new Videogame(
    id,
    INPUT.name.value,
    INPUT.price.value,
    INPUT.category.value,
    INPUT.genre.value,
    INPUT.selectImg.value
  );

  await fetch(`http://localhost:3000/videogames/${id}`, {
    method: "PUT",
    body: JSON.stringify(editGame),
    headers: {
      "Content-type": "application/json",
    },
  }).then(console.log);

  await clearHTML();
  await getGames();
  INPUT.alert.innerText = ALERT.alert2;
  INPUT.form.reset();
  updateGameAlers();

  console.log(editGame);
};

const updateGameAlers = () => {
  removeClass(INPUT.alert, "red");
  removeClass(INPUT.btnEdit, "d-block");
  removeClass(INPUT.btnClose, "d-block");
  removeClass(INPUT.btn, "d-none");
  alertTime(INPUT.alert);
};
//Preguntar a Javi
export const paintGames = (data) => {
  console.log(data);
  for (let t of data) {
    console.log(t.Image.url);

    const v = new Videogame(
      t.id,
      t.name,
      +t.price,
      +t.category,
      +t.genre,
      t.Image.url
    );
    console.log(v);
    paintGame(v);
  }
};

const paintGame = (game) => {
  console.log(game);
  if (game) {
    const container = document.querySelector("#table");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    tr.id = game.id;

    const image = document.createElement("img");
    image.src = game.ImageId;
    image.classList.add("img-game");
    td.appendChild(image);

    let btnDelete = createTd("X");

    btnDelete.classList.add("delete-game");

    let anchor = document.createElement("td");

    const btnEdit = document.createElement("a");
    btnEdit.href = "#insert";
    btnEdit.classList.add("fas", "fa-pencil-alt");
    anchor.appendChild(btnEdit);

    tr.appendChild(td);

    let tdName = createTd(game.name);
    tr.appendChild(tdName);

    let tdPrice = createTd(game.price + "€");

    tr.appendChild(tdPrice);
    let tdCategory = createTd(game.getCategoryText(game.category));
    tr.appendChild(tdCategory);
    let tdGenre = createTd(game.getGenreText(game.genre));
    tr.appendChild(tdGenre);
    tr.appendChild(anchor);
    tr.appendChild(btnDelete);
    container.appendChild(tr);
    btnDelete.onclick = () => {
      deleteGame(game.id);
    };
    btnEdit.onclick = () => {
      getGame(game.id);
    };
  }
};

function createTd(text) {
  const td = document.createElement("td");
  td.innerText = text;
  return td;
}

function clearHTML() {
  while (INPUT.table.firstChild) {
    INPUT.table.removeChild(INPUT.table.firstChild);
  }
}

const orderByPrice = () => {
  const arrow = INPUT.arrow;
  arrow.addEventListener("click", (event) => {
    event.preventDefault();
    arrow.classList.toggle("rotate");
    clearHTML();
    if (arrow.classList.contains("rotate")) {
      orderByAsc();
    } else {
      orderByDesc();
    }
  });
};

const resetForm = () => {
  const inputs = [INPUT.name, INPUT.price, INPUT.selectImg];

  inputs.forEach((input) => {
    input.onclick = () => {
      input.classList.remove("alert");
    };
  });
};

INPUT.btn.addEventListener("click", () => {
  createGame();
});
