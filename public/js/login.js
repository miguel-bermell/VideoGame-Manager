const nameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const sendLogin = document.querySelector("#login");

const onFormSubmit = async () => {
  const login = { email: emailInput.value, password: passwordInput.value };

  // fetch("http://localhost:3000/users/login", {
  //   method: "POST",
  //   redirect: "follow",
  //   body: JSON.stringify(login),
  //   headers: {
  //     "Content-type": "application/json",
  //     Accept: "application/json, text/plain, */*",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
  // console.log(res);
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(login),
    headers: {
      "Content-type": "application/json",
      Accept: "application/json, text/plain, */*",
    },
  });

  const posts = await response.json();
  console.log(posts);
  return posts;
};

const loadPosts = async () => {};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  onFormSubmit();
});
