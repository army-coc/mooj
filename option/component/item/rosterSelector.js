class RosterSelector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('flex', 'flex-col');
    this.createRosterHead();
    this.createRosterBody();
    this.createRosterFoot();
  }

  createRosterHead() {
    // 헤더 베이스
    const rosterHead = createAndAppendElement('div', this, {}, ['flex', 'item-center', 'gap-0_5', 'mb-0_4', 'py-0_4', 'px-0_4', 'mr-1', 'bg-tertiary', 'roster-head']);
    createAndAppendElement('input', rosterHead, { type: 'checkbox', id: 'roster-any' }, [],
      [{ 
        event: 'input',
        handler: function() {
          roster.updateCheckRoster('roster-any', this.checked);
        }
      }]);

    // 항목별 헤더 추가
    ['이름', '소속', '직책', '계급', '전화번호'].forEach(text => createAndAppendElement('label', rosterHead, { innerText: text, htmlFor: 'roster-any' }));
  }

  createRosterBody() {
    const rosterBodyDiv = createAndAppendElement('div', this, {}, ['h-40', 'flex', 'flex-col', 'gap-0_5', 'px-0_4', 'scroll', 'overflow-y-scroll', 'roster-body'])

    roster.getRoster().forEach(person => {
      const rosterDiv = createAndAppendElement('div', rosterBodyDiv, {}, ['flex', 'item-center', 'pb-0_4', 'border-b-tertiary', 'gap-0_5', 'roster-item']);
      createAndAppendElement('input', rosterDiv, { type: 'checkbox', id: person.uuid }, [], [{ 
        event: 'input',
        handler: function() {
          roster.updateCheckRoster(person.uuid, this.checked);
        }
      }]);
      createAndAppendElement('label', rosterDiv, { innerText: person.name, htmlFor: person.uuid }, ['w-1']);
      createAndAppendElement('label', rosterDiv, { innerText: person.affiliation, htmlFor: person.uuid }, ['w-1']);
      createAndAppendElement('label', rosterDiv, { innerText: person.position, htmlFor: person.uuid }, ['w-1']);
      createAndAppendElement('label', rosterDiv, { innerText: person.militaryRank, htmlFor: person.uuid }, ['w-1']);
      createAndAppendElement('label', rosterDiv, { innerText: person.telno, htmlFor: person.uuid }, ['w-1']);
    });
  }

  createRosterFoot() {
    const rosterFootDiv = createAndAppendElement('div', this, {}, ['flex', 'gap-0_5', 'mt-0_6', 'mr-1_4', 'text-lg', 'content-end']);
    createAndAppendElement('span', rosterFootDiv, { innerText: '선택된 사용자 : ' }, ['text-lg']);
    createAndAppendElement('span', rosterFootDiv, { id: 'selectPersonnel', innerText: `${roster.getRoster().length} / ${roster.getCheckRoster().length}` }, ['text-lg']);
  }
}

customElements.define('roster-selector', RosterSelector);
