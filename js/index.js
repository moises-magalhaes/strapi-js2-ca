import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";

const articlesUrl = baseUrl + "articles";

createMenu();
createFooter();

(async function () {
  const container = document.querySelector(".product-container");

  //---------------------------------------------------//

  let addFavorites = document.getElementsByClassName("far");
  console.log(addFavorites); //

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

        console.log("id", id);
        console.log("name", name);
      });
    }

    function getExistingFavs() {}
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();

//---------------------trying to edit  button ------------------//
//--------------------- in the same page -------------------//
