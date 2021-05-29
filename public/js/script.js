import { Videogame } from "./models/Videogame.js";
import { INPUT, ALERT } from "./utils/constants.js";
import { removeColor, removeClass, alertTime } from "./utils/validations.js";

document.addEventListener("DOMContentLoaded", () => {
  getGames();
  resetForm();
  orderByPrice();
});

const createGame = () => {
  if (!INPUT.name.value || !INPUT.price.value) {
    INPUT.name.classList.add("alert");
    INPUT.price.classList.add("alert");
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
    +INPUT.genre.value
  );
  console.log(game);
  INPUT.form.reset();
  insertGame(game);
};

const insertGame = async (game) => {
  /*  const post = JSON.stringify(game);
  try {
    const { data } = await axios.post("http://localhost:3000/videogames", post);
  } catch (error) {
    console.log(err.message);
  } */

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
  INPUT.btn.classList.add("d-none");
  INPUT.btnEdit.classList.add("d-block");
  INPUT.btnClose.classList.add("d-block");
  INPUT.name.style.color = "#061aff";
  INPUT.price.style.color = "#061aff";
  /*   INPUT.btnEdit.onclick = (e) => {
    e.preventDefault();
    updateGame(game.id);
  }; */
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
    INPUT.genre.value
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

const paintGames = (data) => {
  for (let t of data) {
    const v = new Videogame(t.id, t.name, +t.price, +t.category, +t.genre);
    console.log(v);
    paintGame(v);
  }
};

const paintGame = (game) => {
  if (game) {
    const container = document.querySelector("#table");
    const tr = document.createElement("tr");
    tr.id = game.id;
    const btnDelete = document.createElement("td");

    btnDelete.classList.add("delete-game");
    btnDelete.innerText = "X";

    const anchor = document.createElement("a");
    anchor.href = "#insert";

    const btnEdit = document.createElement("i");
    btnEdit.classList.add("fas", "fa-pencil-alt");
    anchor.appendChild(btnEdit);
    let tdName = createTd(game.name);
    tr.appendChild(tdName);

    let tdPrice = createTd(game.price);

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
    /*           const { Images } = game;
            const url = Images.length ? Images[0].url : ""; */
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
  arrow.onclick = () => {
    arrow.classList.toggle("rotate");

    if (arrow.classList.contains("rotate")) {
      console.log("rotando");
    } else {
      console.log("ya no roto");
    }
  };
};

const resetForm = () => {
  const inputs = [INPUT.name, INPUT.price];

  inputs.forEach((input) => {
    input.onclick = () => {
      input.classList.remove("alert");
    };
  });
};

INPUT.btn.addEventListener("click", () => {
  createGame();
});
