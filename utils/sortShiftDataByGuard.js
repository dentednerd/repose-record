// sortShiftDataByGuard creates an object of guard objects

const sortShiftDataByGuard = (shiftData) => {
  return shiftData.reduce((acc, shift) => {
    const guardId = shift[0].split(' ')[3];
    if (!acc[guardId]) acc[guardId] = { shifts: {} };

    const thisGuard = acc[guardId];

    // add each shift by start time
    // then add sleep data for each shift
    const shiftStart = shift[0].substring(1, 17);
    const sleepData = shift.slice(1);
    let sleepMins = {};
    sleepData.forEach((entry, i) => {
      if (i % 2 === 1) {
        sleepMins[sleepData[i - 1].substring(12, 17)] = entry.substring(15, 17) - sleepData[i - 1].substring(15, 17);
      }
    });
    thisGuard.shifts[shiftStart] = sleepMins;

    // add 'numOfSleepPeriods' to each guard
    // only used by totalMinsAsleep below
    if (!thisGuard.numOfSleepPeriods) thisGuard.numOfSleepPeriods = 0;
    thisGuard.numOfSleepPeriods += sleepData.length / 2;

    // add 'totalMinsAsleep' to each guard
    thisGuard.totalMinsAsleep = 0;
    for (let shift in thisGuard.shifts) {
      const thisShift = thisGuard.shifts[shift];
      if (thisGuard.numOfSleepPeriods) {
        thisGuard.totalMinsAsleep += Object.values(thisShift).reduce((a, b) => a + b);
      }
    };

    return acc;
  }, {});
}

module.exports = { sortShiftDataByGuard };
