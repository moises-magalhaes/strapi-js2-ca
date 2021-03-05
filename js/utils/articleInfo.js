import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/common/displayMessage.js";
import { getExistingFavs } from "./favFunctions.js";

export default (async function articleInfo() {
  const articlesUrl = baseUrl + "articles";

  const container = document.querySelector(".product-container");
  const search = document.querySelector("input.search");

  const favorites = getExistingFavs();

  try {
    const response = await fetch(articlesUrl);
    const json = await response.json();

    function renderArticles() {
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
    }

    renderArticles();

    //---------------------search-----------------------------------//

    search.onkeyup = function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredArticles = json.filter(function (article) {
        if (article.title.toLowerCase().includes(searchValue)) {
          return true;
        }
      });

      renderArticles(filteredArticles);
    };

    //-------------------------search end-----------------------//

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

    getExistingFavs();

    function saveFavs(favs) {
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();
