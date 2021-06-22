//--> Importing Parent Class
import View from './view';

//--> Importing Assets
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const pageNum = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.resultsPage;

    //--> Next Page
    if (currentPage === 1 && pageNum > currentPage)
      return `<button data-goto='${
        currentPage + 1
      }' class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;

    //--> Last Page
    if (pageNum === currentPage && pageNum > 1)
      return `<button data-goto='${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>`;

    //--> Midle Pages
    if (currentPage > 1 && pageNum > currentPage)
      return `
        <button data-goto='${
          currentPage - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>

        <button data-goto='${
          currentPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;

    if (pageNum === currentPage) return '';
  }
}

export default new PaginationView();
