function generateUUID() {
  // 밀리초 기반 시간 조회
  let d = new Date().getTime(); 
  // performance timing을 추가해 추가 밀리초 조회 
  let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;

  // 8 - 4 - 4 - 4 - 13 형태로 패턴 생성
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; // 랜덤 숫자 생성
    if (d > 0) {                // 시간 기반 난수 생성
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {                    // 성능 타이밍 기반 난수 생성
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function isUUIDExist(users, uuid) {
  return users.some(user => user.uuid === uuid);
}