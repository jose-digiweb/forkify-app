//--> Importing Parent Class
import View from './view';

//--> Importing Assets
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Try another one.';
  _message = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return this._data
      .map(res => {
        return `
          <li class="preview">
            <a class="preview__link ${
              id === res.id ? 'preview__link--active' : ''
            }" href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="${res.title}" />
              </figure>

              <div class="preview__data">
                <h4 class="preview__title">${res.title} ...</h4>
                <p class="preview__publisher">${res.publisher}</p>
              </div>
              
              <div class="preview__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </a>
          </li>
      `;
      })
      .join('');
  }
}
export default new ResultsView();
