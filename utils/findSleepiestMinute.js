// sleepiestMinute returns a number representing the minute the guard sleeps through the most

const findSleepiestMinute = (sleepiestGuard) => {
  // create an array of all sleep times ([ { startOfSleep: minutesAsleep } ])
  const sleepiestGuardTimes = [];
  Object.values(sleepiestGuard.shifts).forEach((sleepyTime) => {
    if (Object.keys(sleepyTime).length > 1) {
      const firstNap = Object.keys(sleepyTime)[0];
      const secondNap = Object.keys(sleepyTime)[1];
      sleepiestGuardTimes.push({ [firstNap]: sleepyTime[firstNap]  });
      sleepiestGuardTimes.push({ [secondNap]: sleepyTime[secondNap]  });
    } else {
      sleepiestGuardTimes.push(sleepyTime);
    }
  });

  // tally all the minutes asleep
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

  // sort minuteCount by value to find sleepiestMinute
  const sleepiestMinute = Number(Object.keys(minuteCount)
    .sort((a, b) => minuteCount[b] - minuteCount[a])[0]
    .substring(3));

  return sleepiestMinute;
}

module.exports = { findSleepiestMinute };
