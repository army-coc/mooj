class GridItemTitle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('flex', 'content-between');

    const title = this.getAttribute('title');
    const showMore = this.getAttribute('showMore');

    createAndAppendElement('span', this, { innerText: title }, ['text-lg', 'text-bold']);

    if (showMore == 'true') {
      createAndAppendElement('button', this, {innerText: '더보기'}, ['button-none'])
    }
  }
}

customElements.define('grid-item-title', GridItemTitle);
