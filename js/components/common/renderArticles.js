/*import articleInfo from "../../utils/articleInfo.js";

export default function renderArticles() {
  articleInfo;
  

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
*/