const navigationService = [
  { name: '서비스' },
  { name: '단문전송', href: '#' },
  { name: '센터원 명단 수정', href: '/option/participantRoster.html' },
  { name: '위기조치기구 수정', href: '/option/crisisRoster.html' }
]

const navigationSurppot = [
  { name: '지원' },
  { name: '이메일', href: '#' },
  { name: '단문전송 체계 상태', href: '#' },
]

const navigationPortal = [
  { name: '서비스 포탈' },
  { name: '육군본부', href: '#' },
  { name: '침해대응시스템', href: '#' },
  { name: '육군 사이버상황실', href: '#' },
  { name: '육군 사이버작전센터', href: '#' }
]

const navigation = {
  navigationService,
  navigationSurppot,
  navigationPortal,
}

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('h-48', 'w-full', 'block', 'bg-secondary', 'md-p');
    this.createLinker();
    this.createCopyright();
  }

  createLinker() {
    const footerLinker = createAndAppendElement('div', this, {}, ['flex', 'content-between']);
    for (const key in navigation) {
      const linkerItemDiv = createAndAppendElement('div', footerLinker, {}, ['flex', 'flex-col', 'gap-1']);
  
      navigation[key].map((item, index) => {
        // 네비게이션 타이틀
        if (index == 0) {
          createAndAppendElement('span', linkerItemDiv, {innerText: item.name}, ['text-lg', 'text-tertiary', 'pb-0_6', 'text-bold', 'cursor-default'])
        }
        // 네비게이션 링크
        else {
          createAndAppendElement('a', linkerItemDiv, {innerText: item.name, href: item.href}, ['text-lg', 'text-tertiary', 'text-decoration-none'])
        } 
      })
    }
  }

  createCopyright() {
    const copyrightDiv = createAndAppendElement('div', this, {}, ['mt-8', 'flex', 'item-center', 'content-between']);

    const textDiv = createAndAppendElement('div', copyrightDiv, {}, ['flex', 'flex-col', 'gap-0_5']);
    createAndAppendElement('span', textDiv, { innerText: '문 전 | MOOJ' }, ['text-xl', 'text-tertiary', 'text-bold']);
    createAndAppendElement('span', textDiv, { innerText: '육군 체계 상태에 따라 메시지 전송이 지연될 수 있습니다.' }, ['text-lg', 'text-tertiary']);
    createAndAppendElement('span', textDiv, { innerText: '©️ 2024. MOOJ. all rights reserved.' }, ['text-lg', 'text-tertiary']);

    const imgDiv = createAndAppendElement('div', copyrightDiv, {});
    createAndAppendElement('img', imgDiv, { src: '/assets/icon.png' }, ['w-10']);
  }
}

customElements.define('ct-footer', Footer);
