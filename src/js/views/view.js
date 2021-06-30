//--> Importing Assets
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Rendering The data to the UI
   * @param {Expecting an Object | Array of Objects} data the data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] if False, then create a Markup String instead of Rendering
   * @returns {undefined | string} A string is returned if Render is False
   * @this {Object} View Instance
   * @author Jose Furtado
   * @todo Finish the Implementation
   */

  render(data, render = true) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDom.querySelectorAll('*'));

    const currentElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((el, i) => {
      const curEl = currentElements[i];

      //--> Updates changed text
      if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = el.textContent;
      }

      //--> Update changed attributes
      if (!el.isEqualNode(curEl))
        Array.from(el.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const spinner = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', spinner);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
