const participantPersonnelData = localStorage.getItem('participantPersonnelData');
const crisisPersonnelData      = localStorage.getItem('crisisPersonnelData');


class Roster {
  constructor() {
    this.personnel = [];
  }

  createParticipantRoster(personnelData) {
    // 개행 기준 슬라이스
    const personnelColumns = personnelData.split('\n');

    // 탭 기준 슬라이스
    personnelColumns.forEach((personnelColumn) => {
      // 사용자 정보 할당
      const personnelRows = (personnelColumn.split('\t')).filter((personnel) => { return personnel !== '' });
      const [, , affiliation, position, militaryRank, name, telno, ...groupValues] = personnelRows;

      // 잘못된 데이터 제외
      if (militaryRank === undefined || militaryRank === '계급') return;
      if (name === undefined || name === '성명') return;

      // 그룹 초기화
      let groups = {
        groupA: false,
        groupB: false,
        groupC: false,
        groupD: false
      };

      // 그룹 체크 함수
      const checkGroup = (value) => {
        if (value === 'A') groups.groupA = true;
        if (value === 'B') groups.groupB = true;
        if (value === 'C') groups.groupC = true;
        if (value === 'D') groups.groupD = true;
      };

      // 그룹 값 체크
      groupValues.forEach(checkGroup);

      let uuid = generateUUID();
      while (isUUIDExist(this.personnel, uuid)) { uuid = generateUUID(); }

      // 데이터 추가
      this.personnel.push({
        affiliation,
        position,
        militaryRank,
        name,
        telno,
        ...groups,
        select: false,
        uuid: uuid,
        crisis: false,
        crisisGroup: '',
      });
    })
  }
  

  createCrisisRoster(personnelData) {
    if (!personnelData || personnelData.length == 0) {
      return;
    }
    let nowCrisisClassification;

    // 개행 기준 슬라이스
    const personnelColumns = personnelData.split('\n');

    // 탭 기준 슬라이스
    personnelColumns.forEach((personnelColumn) => {
      // 조치기구 정보 할당
      const personnelRows = (personnelColumn.split('\t')).filter((personnel) => { return personnel !== '' });

      // 위기조치기구 분류
      const [personnelClassification, , , ,] = personnelRows;
      switch(personnelClassification) {
        case '긴급조치반':
          nowCrisisClassification = ['A', 'B', 'C'];
          break;
        case '초기대응반':
          nowCrisisClassification = ['A', 'B'];
          break;
        case '위기조치반':
          nowCrisisClassification = ['A'];
          break;
      }


      let affiliation, militaryRank, name, date;
      switch(personnelRows.length) {
        case 5:
          [affiliation, militaryRank, , name, date] = personnelRows;
          break;
        case 6:
          [, affiliation, militaryRank, , name, date] = personnelRows;
          break;
        case 7:
          [, , affiliation, militaryRank, , name, date] = personnelRows;
          break
      }

      // 잘못된 데이터 제외
      if (militaryRank === undefined || militaryRank === '계급') return;
      if (name === undefined || name === '성명') return;

      // 그룹 초기화
      let groups = {
        groupA: false,
        groupB: false,
        groupC: false,
        groupD: false
      };

      // 그룹 체크 함수
      const checkGroup = (value) => {
        if (value === 'A') groups.groupA = true;
        if (value === 'B') groups.groupB = true;
        if (value === 'C') groups.groupC = true;
        if (value === 'D') groups.groupD = true;
      };

      // 그룹 값 체크
      nowCrisisClassification.forEach(checkGroup);

      // 데이터 업데이트
      const existingPerson = this.personnel.find(p => p.name === name && p.militaryRank === militaryRank);
      if (existingPerson) {
        existingPerson.groupA = existingPerson.groupA || groups.groupA;
        existingPerson.groupB = existingPerson.groupB || groups.groupB;
        existingPerson.groupC = existingPerson.groupC || groups.groupC;
        existingPerson.groupD = existingPerson.groupD || groups.groupD;
        existingPerson.crisis = true;
        existingPerson.crisisGroup = isEqual(nowCrisisClassification, ['A', 'B', 'C'])
        ? '긴급조치반'
        : isEqual(nowCrisisClassification, ['A', 'B'])
        ? '초기대응반'
        : '위기조치반' ;
      }
    })
  }

  updateRoster(name, militaryRank, select) {
    const existingPerson = this.personnel.find(p => p.name === name && p.militaryRank === militaryRank);
    existingPerson.select = select;
    return existingPerson
  }

  getRoster() {
    // const existingPerson = this.personnel.find(p => p.name === name && p.militaryRank === militaryRank);
    return this.personnel;
  }

  getCrisisRoster() {
    const existingPerson = this.personnel.filter(p => p.crisis === true);
    return existingPerson ? existingPerson : []
  }

  getCheckRoster() {
    const existingPerson = this.personnel.filter(p => p.select === true);
    return existingPerson ? existingPerson : []
  }

  updateCheckRoster(uuid, check) {
    const rosterAnyCheckbox = document.querySelector('#roster-any');
    const groupAnyCheckbox  = document.querySelector('#group-any');
    const groupAllCheckbox  = document.querySelector('#group-all');
    const groupACheckbox  = document.querySelector('#group-a');
    const groupBCheckbox  = document.querySelector('#group-b');
    const groupCCheckbox  = document.querySelector('#group-c');
    const groupDCheckbox  = document.querySelector('#group-d');

    const updatePerson = (person) => {
      const checkBoxElement = document.getElementById(person.uuid);
      if (checkBoxElement) {
        checkBoxElement.checked = check;
        person.select = check;
        return person;
      }
    }

    const updatePersonGroup = (person) => {
      const checkBoxElement = document.getElementById(person.uuid);
      if (checkBoxElement) {
        const aCh = groupACheckbox.checked && person.groupA;
        const bCh = groupBCheckbox.checked && person.groupB;
        const cCh = groupCCheckbox.checked && person.groupC;
        const dCh = groupDCheckbox.checked && person.groupD;

        const ch = aCh || bCh || cCh || dCh;
        checkBoxElement.checked = ch;
        person.select = ch;
        return person;
      }
    }

    // 수신자 체크박스 업데이트
    if (['roster-any', 'group-any'].includes(uuid)) {
      this.personnel = this.personnel.map(updatePerson);      
    }

    if ('group-all' == uuid) {
      groupACheckbox.checked = check;
      groupBCheckbox.checked = check;
      groupCCheckbox.checked = check;
      groupDCheckbox.checked = check;
      this.personnel = this.personnel.map(person => {
        if (person['groupA'] || person['groupB'] || person['groupC'] || person['groupD']) return updatePersonGroup(person);
        return person;
      });
    }

    if (['group-a', 'group-b', 'group-c', 'group-d'].includes(uuid)) {
      this.personnel = this.personnel.map(person => {
        if (person[uuid.changeGroupname()]) return updatePersonGroup(person);
        return person;
      });
    }

    if (uuid.checkFormatUUID) {
      const existingPerson = this.personnel.find(p => p.uuid === uuid);
      if (existingPerson) updatePerson(existingPerson);
    }
    



    // 수신자 선택 명수 업데이트
    const selectedPersonnel        = this.personnel.filter(p => p.select === true);
    const selectedPersonnelElement = document.querySelector('#selectPersonnel');
    selectedPersonnelElement.innerText = `${this.personnel.length} / ${selectedPersonnel.length}`;

    // 수신자 체크박스 업데이트
    const selectedAGroupAll = this.personnel
      .filter(person => person['groupA'])
      .every(person => person.select);
    groupACheckbox.checked = selectedAGroupAll;

    const selectedBGroupAll = this.personnel
      .filter(person => person['groupB'])
      .every(person => person.select);
    groupBCheckbox.checked = selectedBGroupAll;

    const selectedCGroupAll = this.personnel
      .filter(person => person['groupC'])
      .every(person => person.select);
    groupCCheckbox.checked = selectedCGroupAll;

    const selectedDGroupAll = this.personnel
      .filter(person => person['groupD'])
      .every(person => person.select);
    groupDCheckbox.checked = selectedDGroupAll;


    // 모든 그룹 수신자 체크박스 업데이트
    const selectedGroupAll = groupACheckbox.checked && groupBCheckbox.checked && groupCCheckbox.checked && groupDCheckbox.checked;
    groupAllCheckbox.checked = selectedGroupAll;


    // 모든 수신자 선택 체크박스 업데이트
    const selectedAny = this.personnel.length == selectedPersonnel.length;
    groupAnyCheckbox.checked = selectedAny;
    rosterAnyCheckbox.checked = selectedAny;

    if (selectedAny == true) {
      groupAllCheckbox.checked = selectedAny;
      groupACheckbox.checked = selectedAny;
      groupBCheckbox.checked = selectedAny;
      groupCCheckbox.checked = selectedAny;
      groupDCheckbox.checked = selectedAny;
    }

    if (selectedPersonnel.length == 0) {
      groupAllCheckbox.checked = false;
      groupACheckbox.checked = false;
      groupBCheckbox.checked = false;
      groupCCheckbox.checked = false;
      groupDCheckbox.checked = false;
    }
  }
}
