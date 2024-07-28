class MessageAction extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const messageAction = createAndAppendElement('div', this, {}, ['gap-2_5', 'flex', 'content-end']);

    createAndAppendElement('button', messageAction, {
      innerText: '초기화'
    }, ['button', 'button-lg', 'button-secondary'], [{
      event: 'click',
      handler: () => {
        roster.updateCheckRoster('roster-any', false);
        document.getElementById('intrusion-web').value = 0;
        document.getElementById('intrusion-internet').value = 0;
        document.getElementById('intrusion-military').value = 0;
        document.getElementById('intrusion-tactical').value = 0;
        document.getElementById('message-area').value = '';
      }
    }]);
    
    createAndAppendElement('button', messageAction, {
      innerText: '전송'
    }, ['button', 'button-lg', 'button-primary'], [{
      event: 'click',
      handler: () => {
        message.insertMessage();
      }
    }]);
  }
}

customElements.define('message-action', MessageAction);
