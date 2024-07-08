const navigationMenu = [
  { name: '메인', href: '/option/index.html' },
  { name: '송신결과', href: '/option/result.html' },
  { name: '메뉴얼', href: '/option/manual.html' },
];

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('h-6', 'w-full', 'py-1', 'px-6', 'flex', 'content-between', 'fixed', 'top-0', 'bg-primary', 'box-shadow-primary');
    this.createHeaderMenu();
    this.createHeaderUser();
  }

  createHeaderMenu() {
    const headerMenuDiv = createAndAppendElement('div', this, {}, ['w-40', 'flex', 'item-center', 'content-between']);
    createAndAppendElement('img', headerMenuDiv, { src: '/assets/logo.png' }, ['h-4']);

    navigationMenu.forEach((item) => {
      createAndAppendElement('header-button', headerMenuDiv, { label: item.name, href: item.href });
    });
  }

  createHeaderUser() {
    const headerUserDiv = createAndAppendElement('div', this, {}, ['flex', 'item-center', 'content-between']);
    createAndAppendElement('header-button', headerUserDiv, { label: '로그인', href: '#' });
  }
}

customElements.define('ct-header', Header);
