/*import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";

createMenu();
createFooter();

let addFavorites = document.getElementsByClassName("add-fav");
console.log(addFavorites);

addFavorites.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick(event) {
  console.log(event);
  //this = event.target
  event.target.classlist.toggle("fa");
  event.target.classlist.toggle("far");
}


//const AddFavorites = document.querySelectorAll()
/*
for (let i = 0; i < favorites.length; i++) {
  favorites[i].addEventListener("click", () => {
    console.log("added to favorites");
  });
}*/
