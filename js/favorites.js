import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { saveToken, saveUser } from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";

createMenu();
createFooter();

const favorites = getExistingFavs();
const container = document.querySelector(".product-container");

favorites.forEach((article) => {
  container.innerHTML += `<div class= "article">
  <h4>${article.name}</h4>
  <span class="add-fav favorite">
      Remove from Favorites: 
    <i class="fas fa-bookmark" 
    data-id="${article.id}"
    data-name="${article.name}">
    </i>
  </span>
  </div>`;
});
