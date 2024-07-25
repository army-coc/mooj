class CrisisRosterView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const crisisHead = createAndAppendElement('div', this, {}, ['flex', 'crisis-head']);
    createAndAppendElement('span', crisisHead, { innerText: '구분' }, ['text-lg']);
    createAndAppendElement('span', crisisHead, { innerText: '이름' }, ['text-lg']);
    createAndAppendElement('span', crisisHead, { innerText: '계급' }, ['text-lg']);

    const crisisRoster = roster.getCrisisRoster().sortByCrisisGroup();
    crisisRoster.map((roster) => {
      const crisisItem = createAndAppendElement('div', this, {}, ['flex', 'crisis-item']);
      createAndAppendElement('span', crisisItem, { innerText: roster.crisisGroup }, ['text-lg']);
      createAndAppendElement('span', crisisItem, { innerText: roster.name }, ['text-lg']);
      createAndAppendElement('span', crisisItem, { innerText: roster.militaryRank }, ['text-lg']);
    })
  }
}

customElements.define('crisis-roster-view', CrisisRosterView);
