const fs = require('fs');
const {
  sortDataByShift,
  sortShiftDataByGuard,
  findSleepiestGuard,
  findSleepiestMinute
} = require('./utils');

const reposeRecord = () => {
  let data;
  try {
    data = fs.readFileSync('./input.txt', 'utf8');
  } catch (err) {
    throw new Error;
  }

  const dataByShift = sortDataByShift(data)
  const dataByGuard = sortShiftDataByGuard(dataByShift);
  const { sleepiestGuard, sleepiestGuardId } = findSleepiestGuard(dataByGuard);
  const sleepiestMinute = findSleepiestMinute(sleepiestGuard);

    return sleepiestGuardId * sleepiestMinute;
}

console.log(reposeRecord());
