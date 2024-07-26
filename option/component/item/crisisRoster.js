class CrisisRoster extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const messageTextarea = createAndAppendElement('textarea', this, {
        placeholder: '구  분		소속	계급	군번	성명	기간',
        id: 'crisis-roster-area'
      }, ['h-30', 'w-full', 'p-1', 'text-lg', 'resize-none', 'border-radius-base', 'outline-none']);
    }
  }
  
  customElements.define('crisis-roster-area', CrisisRoster);
  