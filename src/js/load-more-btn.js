export default class loadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }

  show() {
    this.refs.button.classList.remove('is-hiden');
  }
  hide() {
    this.refs.button.classList.add('is-hiden');
  }
}
