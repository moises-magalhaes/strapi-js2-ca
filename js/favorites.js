import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";

createMenu();
createFooter();

let favorites = document.querySelectorAll(".add-to-fav");

for (let i = 0; i < favorites.length; i++) {
  favorites[i].addEventListener("click", () => {
    console.log("added to favorites");
  });
}
