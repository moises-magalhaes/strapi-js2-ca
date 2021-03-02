import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";

const articlesUrl = baseUrl + "articles";

createMenu();
createFooter();

(async function () {
  const container = document.querySelector(".product-container");

  try {
    const response = await fetch(articlesUrl);
    const json = await response.json();

    container.innerHTML = "";
    // throw "custom message";

    json.forEach(function (article) {
      container.innerHTML += `<div class="article" href="/">
                                        <h4> ${article.title}</h4>
                                        <p> ${article.summary}</p>
                                        <p>${article.author}</p>
                                        <button class="add-to-fav">add to Favorites</button>    
                                    </div>`;
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();
