import { paintGames } from "../script.js";

export const orderByDesc = () =>
  fetch("http://localhost:3000/videogames/all/desc")
    .then((response) => response.json())
    .then((results) => {
      paintGames(results);
    })
    .catch((error) => {
      console.error(error);
    });

export const orderByAsc = () =>
  fetch("http://localhost:3000/videogames/all/asc")
    .then((response) => response.json())
    .then((results) => {
      paintGames(results);
    })
    .catch((error) => {
      console.error(error);
    });
