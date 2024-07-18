class GridFrame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('grid', 'gap-2');
  }
}

customElements.define('grid-frame', GridFrame);
