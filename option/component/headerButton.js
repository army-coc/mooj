// HeaderButton 클래스 정의
class HeaderButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const label = this.getAttribute('label');
    const href = this.getAttribute('href');

    const menuButton = createAndAppendElement('button', this, {}, [
      'inline-block', 'px-0_6', 'py-0_8', 'border-none', 'bg-primary', 
      'text-center', 'text-decoration-none', 'cursor-pointer', 'border-radius-sm', 'select-none'
    ]);

    createAndAppendElement('a', menuButton, { innerText: label, href: href }, [
      'text-xl', 'font-bold', 'text-decoration-none', 'text-black'
    ]);
  }
}

customElements.define('header-button', HeaderButton);
