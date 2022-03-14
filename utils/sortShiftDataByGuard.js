const sortShiftDataByGuard = (shiftData) => {
  return shiftData.reduce((acc, shift) => {
    // create an object of guard objects, each with a 'shifts' property
    const guardId = shift[0].split(' ')[3];
    if (!acc[guardId]) acc[guardId] = { shifts: {} };

    // add each shift by start time AND sleep data for each shift
    const shiftStart = shift[0].substring(1, 17);
    const sleepData = shift.slice(1);
    let sleepMins = {};
    sleepData.forEach((entry, i) => {
      if (i % 2 === 1) {
        sleepMins[sleepData[i - 1].substring(12, 17)] = entry.substring(15, 17) - sleepData[i - 1].substring(15, 17);
      }
    });
    acc[guardId].shifts[shiftStart] = sleepMins;

    // add 'numOfSleepPeriods' properties to each guard
    if (!acc[guardId].numOfSleepPeriods) acc[guardId].numOfSleepPeriods = 0;
    acc[guardId].numOfSleepPeriods += sleepData.length / 2;

    // add 'totalMinsAsleep' to each guard
    acc[guardId].totalMinsAsleep = 0;
    for (let shift in acc[guardId].shifts) {
      const thisShift = acc[guardId].shifts[shift];
      if (acc[guardId].numOfSleepPeriods) acc[guardId].totalMinsAsleep += Object.values(thisShift).reduce((a, b) => a + b);
    };

    return acc;
  }, {});
}

module.exports = { sortShiftDataByGuard };
