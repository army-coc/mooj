class ParticipantRoster extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const messageTextarea = createAndAppendElement('textarea', this, {
        placeholder: 'No	소속1	소속2	직책	계급	성명	전화번호	위기조치기구	그룹A	그룹B	그룹C',
        id: 'participant-roster-area'
      }, ['h-30', 'w-full', 'p-1', 'text-lg', 'resize-none', 'border-radius-base', 'outline-none']);
    }
  }
  
  customElements.define('participant-roster-area', ParticipantRoster);
  