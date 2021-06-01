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

document.querySelector("form").addEventListener("click", (e) => {
  e.preventDefault();
});
document.querySelector("table").addEventListener("click", (e) => {
  e.preventDefault();
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
  }).then(console.log);

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

const getGames = async () => {
  await fetch("http://localhost:3000/videogames/all")
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

const deleteGame = async (id) => {
  console.log(id);
  await fetch(`http://localhost:3000/videogames/${id}`, {
    method: "DELETE",
    body: null,
    headers: {
      "Content-type": "application/json",
    },
  }).then(console.log);
  await getGames();
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

  //Revisar esta función
  const tbody = document.querySelector("table");
  tbody.addEventListener("mouseover", ({ target }) => {
    if (game.id == target.parentNode.id) {
      console.log(target.parentNode.lastChild.firstChild);
      const x = target.parentNode.lastChild;
      const btnDel = target.parentNode.lastChild.firstChild;
      x.classList.add("unselectable");
      x.disabled = true;
      btnDel.classList.add("unselectable");
      btnDel.disabled = true;
    }
  });
  INPUT.btnEdit.addEventListener("click", () => {
    updateGame(game.id);
  });
  INPUT.btnClose.addEventListener("click", () => {
    INPUT.form.reset();
    updateGameAlers();
  });
};

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

  INPUT.alert.innerText = ALERT.alert2;
  INPUT.form.reset();
  updateGameAlers();
  await getGames();
  const tbody = document.querySelector("table");
  tbody.removeEventListener("mouseover", ({ target }) => {
    if (game.id == target.parentNode.id) {
      console.log(target.parentNode.lastChild.firstChild);
      const x = target.parentNode.lastChild;
      const btnDel = target.parentNode.lastChild.firstChild;
      x.classList.remove("unselectable");
      x.disabled = false;
      btnDel.classList.remove("unselectable");
      btnDel.disabled = false;
    }
  });
  console.log(editGame);
};

const updateGameAlers = () => {
  const btnDelete = document.querySelector(".delete-game");
  removeClass(btnDelete, "unselectable");
  removeClass(INPUT.alert, "red");
  removeClass(INPUT.btnEdit, "d-block");
  removeClass(INPUT.btnClose, "d-block");
  removeClass(INPUT.btn, "d-none");
  alertTime(INPUT.alert);
};

export const paintGames = (data) => {
  console.log(data);
  clearHTML();

  for (let t of data) {
    const v = new Videogame(
      t.id,
      t.name,
      +t.price,
      +t.category,
      +t.genre,
      t.Image.url
    );
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
    const button = document.createElement("button");
    const image = document.createElement("img");
    image.src = game.ImageId;
    image.classList.add("img-game");
    td.appendChild(image);

    let btnDelete = document.createElement("td");
    btnDelete.appendChild(button);
    button.classList.add("delete-game");
    button.innerText = "X";

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

    container.addEventListener("click", async ({ target }) => {
      console.log(target.tagName);
      console.log(target.parentNode.id);
      console.log(game.id);
      if (target.tagName == "BUTTON") {
        await deleteGame(target.parentNode.parentNode.id);
      }
    });

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
  arrow.addEventListener("click", async (event) => {
    event.preventDefault();
    arrow.classList.toggle("rotate");
    clearHTML();
    if (arrow.classList.contains("rotate")) {
      await orderByAsc();
    } else {
      await orderByDesc();
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
