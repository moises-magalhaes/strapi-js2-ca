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
  const favorites = getExistingFavs();

  //---------------------------------------------------//
  // let favoritesButton = document.getElementsByClassName("far");

  try {
    const response = await fetch(articlesUrl);
    const json = await response.json();

    container.innerHTML = "";

    json.forEach(function (article) {
      let changeCSS = "far";

      const doesArticleExist = favorites.find(function (fav) {
        return parseInt(fav.id) === article.id;
      });

      if (doesArticleExist) {
        changeCSS = "fas";
      }

      container.innerHTML += `<div class="article" href="/">
        <h4> ${article.title}</h4>
        <p> ${article.summary}</p>
        <p>${article.author}</p>
        <span class="add-fav favorite">
          add to Favorites: 
          <i class="${changeCSS} fa-bookmark" data-id="${article.id}" data-name="${article.title}">
          </i>
        </span>    
      </div>`;
    });

    const favoritesButton = document.querySelectorAll(".add-fav i");

    for (let i = 0; i < favoritesButton.length; i++) {
      const btn = favoritesButton[i];

      btn.addEventListener("click", function (event) {
        event.target.classList.toggle("far");
        event.target.classList.toggle("fas");

        const id = this.dataset.id;
        const name = this.dataset.name;

        const currentFavs = getExistingFavs();

        const articleExists = currentFavs.find(function (fav) {
          return fav.id === id;
        });
        if (!articleExists) {
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

    //----------------adding to local Storage-------------------------//
    function saveFavs(favs) {
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();
