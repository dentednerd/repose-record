const findSleepiestMinute = (sleepiestGuard) => {
  const sleepiestGuardTimes = [];
  Object.values(sleepiestGuard.shifts).forEach((sleepyTime) => {
    if (Object.keys(sleepyTime).length > 1) {
      sleepiestGuardTimes.push({ [Object.keys(sleepyTime)[0]]: sleepyTime[Object.keys(sleepyTime)[0]]  });
      sleepiestGuardTimes.push({ [Object.keys(sleepyTime)[1]]: sleepyTime[Object.keys(sleepyTime)[1]]  });
    } else {
      sleepiestGuardTimes.push(sleepyTime);
    }
  });

  // find the sleepiest minute
  // couldn't get .reduce working on this one, plz show me a better way
  let minuteCount = {};
  sleepiestGuardTimes
    .forEach((time) => {
      const minute = Object.keys(time)[0].substring(3);
      const numOfMinsAsleep = Object.values(time)[0];

      for (i = 0; i < numOfMinsAsleep; i++) {
        const timeToInc = `00:${(Number(minute) + i).toString().padStart(2, '0')}`;
        if (!minuteCount[timeToInc]) {
          minuteCount[timeToInc] = 1;
        } else {
          minuteCount[timeToInc]++;
        }
      }
    });

  const sleepiestMinute = Number(Object.keys(minuteCount)
    .sort((a, b) => minuteCount[b] - minuteCount[a])[0]
    .substring(3));

  return sleepiestMinute;
}

module.exports = { findSleepiestMinute };
