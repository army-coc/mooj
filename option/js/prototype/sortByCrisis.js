Array.prototype.sortByCrisisGroup = function () {
  const priorityGroup = ['긴급조치반', '초기대응반', '위기조치반'];
  const priorityRank  = ['소장', '준장', '3급', '대령', '4급', '중령', '5급', '소령', '대위', '6급', '중위', '7급', '8급', '소위', '9급', '준위', '상사', '중사', '하사', '병장', '상병', '일병', '이병'];

  return this.sort((a, b) => {
    return priorityRank.indexOf(a.militaryRank) - priorityRank.indexOf(b.militaryRank);
  }).sort((a, b) => {
    return priorityGroup.indexOf(a.crisisGroup) - priorityGroup.indexOf(b.crisisGroup);
  });
};
