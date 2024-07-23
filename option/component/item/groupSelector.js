class GroupSelector extends HTMLElement {
  constructor() {
    super();
    this.classList.add('flex', 'gap-1', 'items-center', 'content-between');
  }

  connectedCallback() {
    const label = this.getAttribute('label');
    const ctID = this.getAttribute('ct-id');
    const helpMessage = this.getAttribute('help');

    this.createSelector(label, ctID);
    this.createHelpMessage(helpMessage);
  }

  createSelector(text, id) {
    const selectorDiv = createAndAppendElement('div', this, {}, ['flex', 'gap-0_5', 'cursor-pointer']);

    if (id == 'group-any') {
      createAndAppendElement('input', selectorDiv, { type: 'checkbox', id: id },  ['text-lg', 'cursor-pointer'],
        [{ 
          event: 'input',
          handler: function() {
            roster.updateCheckRoster('group-any', this.checked);
          }
        }]);
    } else if (id == 'group-all') {
      createAndAppendElement('input', selectorDiv, { type: 'checkbox', id: id },  ['text-lg', 'cursor-pointer'],
        [{ 
          event: 'input',
          handler: function() {
            roster.updateCheckRoster('group-all', this.checked);
          }
        }]);
    } else if (['group-a', 'group-b', 'group-c', 'group-d'].includes(id)) {
      createAndAppendElement('input', selectorDiv, { type: 'checkbox', id: id },  ['text-lg', 'cursor-pointer'],
        [{ 
          event: 'input',
          handler: function() {
            roster.updateCheckRoster(id, this.checked);
          }
        }]);
    } else {
      createAndAppendElement('input', selectorDiv, { type: 'checkbox', id: id }, ['text-lg', 'cursor-pointer']);
    }
    createAndAppendElement('label', selectorDiv, { htmlFor: id, innerText: text }, ['text-lg', 'cursor-pointer']);
  }

  createHelpMessage(message) {
    const questionMark = createAndAppendElement('div', this, { innerText: '?' }, ['mr-0_5', 'cursor-pointer', 'tooltip', 'text-lg'])
    createAndAppendElement('span', questionMark, { innerText: message }, ['tooltiptext'])
  }
}

customElements.define('group-selector', GroupSelector);
