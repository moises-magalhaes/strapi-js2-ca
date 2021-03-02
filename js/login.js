import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

createMenu();
createFooter();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "Invalid values", ".message-container");
  }

  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  const url = baseUrl + "auth/local";
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    //for it to console log, you must be logged
    // in in strapi and with all the user and password information created in strapi

    console.log(json);

    if (json.user) {
      //INSTEAD OF SUCCESS MESSAGE WE CAN REDIRECT TO HOMEPAGE
      //	displayMessage("success", "successfully loggedin", ".message-container");

      saveToken(json.jwt);
      saveUser(json.user);

      // redirect to homepage
      location.href = "/";
    }

    if (json.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
