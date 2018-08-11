/* eslint-env jquery */

(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');
  const apiKey = '3f0ae31c62644b53a8c298062956de7c';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    $.ajax({
      url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${apiKey}`
    }).done(addArticle);
  });

  function addArticle(data) {
    if (data.response && data.response.docs && data.response.docs != 0) {
      const text = '<ul>' + data.response.docs.map(article => `<li><p>${article.snippet}</p><p>${article.web_url}</p></li>`).join('') + '</ul>';
      responseContainer.insertAdjacentHTML('beforeend', text);
    }
    else {
      responseContainer.innerHTML = 'There are no articles on this topic.';
    }
  }
})();
