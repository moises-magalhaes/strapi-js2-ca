import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";
import { getExistingFavs } from "./utils/favFunctions.js";

const articlesUrl = baseUrl + "articles";

createMenu();
createFooter();

(async function () {
  const container = document.querySelector(".product-container");

  //---------------------------------------------------//

  let addFavorites = document.getElementsByClassName("far");

  try {
    const response = await fetch(articlesUrl);
    const json = await response.json();

    container.innerHTML = "";

    json.forEach(function (article) {
      container.innerHTML += `<div class="article" href="/">
        <h4> ${article.title}</h4>
        <p> ${article.summary}</p>
        <p>${article.author}</p>
        <span class="add-fav favorite">
          add to Favorites: 
          <i class="far fa-bookmark" data-id="${article.id}" data-name="${article.title}">
          </i>
        </span>    
      </div>`;
    });

    for (let i = 0; i < addFavorites.length; i++) {
      const btn = addFavorites[i];

      btn.addEventListener("click", function (event) {
        console.log("clicked");
        console.log(event);
        event.target.classList.toggle("far");
        event.target.classList.toggle("fas");

        const id = this.dataset.id;
        const name = this.dataset.name;

        const currentFavs = getExistingFavs();

        const articleExists = currentFavs.find(function (fav) {
          return fav.id === id;
        });
        if (!articleExists) {
          console.log("articleExists", articleExists);

          const article = { id: id, name: name };

          currentFavs.push(article);

          saveFavs(currentFavs);
        } else {
          const newFavs = currentFavs.filter((fav) => fav.id !== id);
          saveFavs(newFavs);
        }
      });
    }

    //----------------adding to local Storage-------------------------//

    getExistingFavs();
    /*function getExistingFavs() {
      const favs = localStorage.getItem("favorites");
      console.log(favs);
      if (!favs) {
        return [];
      } else {
        return JSON.parse(favs);
      }
    }*/
    //----------------adding to local Storage-------------------------//
    function saveFavs(favs) {
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();
