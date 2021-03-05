import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/common/displayMessage.js";
import { getExistingFavs } from "./favFunctions.js";
//import search from "../components/common/search.js";

export default (async function articleInfo() {
  const articlesUrl = baseUrl + "articles";

  const container = document.querySelector(".product-container");

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

    renderArticles(json);

    //---------------------search-----------------------------------//

    function search(articles) {
      const search = document.querySelector("input.search");

      search.addEventListener("keyup", doFiltering);

      function doFiltering(event) {
        let value = $(this).val();
        console.log(value);
        let data = searchArticles(value, json);
        renderArticles(data);
      }

      function searchArticles(value, data) {
        const filteredData = [];

        for (let i = 0; i < data.length; i++) {
          value = value.toLowerCase();
          var title = data[i].title.toLowerCase();
          console.log(data[i]);

          if (title.includes(value)) {
            filteredData.push(data[i]);
          }
          return filteredData;
        }
      }
      /*  const searchValue = json.filter(function (article) {
          if (article.title.toLowerCase().includes()) {
            return true;
          }
        });*/

      // renderArticles(searchValue);
    }
    search();


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
