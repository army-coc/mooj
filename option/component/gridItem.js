class GridItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const disableBorder = this.getAttribute('disable-border');
    const disablePadding = this.getAttribute('disable-padding');

    if (!disablePadding) {
        this.classList.add('p-1');
    }
    this.classList.add('border-radius-base', 'select-none');

    if (disableBorder) {
        this.classList.add('border-disable');
    } else {
        this.classList.add('border-solid');
    }
}

}

customElements.define('grid-item', GridItem);
