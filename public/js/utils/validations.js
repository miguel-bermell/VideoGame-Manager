import { INPUT } from "./constants.js";

export const removeColor = (input) => {
  const colors = Array.isArray(input) ? input : [input];
  console.log(colors);
  colors.forEach((inpt) => {
    return (inpt.style.color = "initial");
  });
};

export const removeClass = (input, element) => {
  return input.classList.remove(element);
};

export const alertTime = (input) => {
  return setTimeout(() => {
    input.innerText = "";
  }, 3000);
};

export const defaultImg = "https://i.imgur.com/a60WgNk.png";
