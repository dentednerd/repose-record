const fs = require('fs');

const reposeRecord = () => {
  let data;
  try {
    data = fs.readFileSync('./input.txt', 'utf8');
  } catch (err) {
    throw new Error;
  }

  const dataByShift = data
    .split('\n')
    .sort()
    .reduce((acc, entry) => {
      // create a subarray of entries for each shift
      const isGuard = entry.split(' ')[2] === "Guard";
      if (isGuard) {
        acc.push([ entry ]);
      } else {
        if (acc[acc.length - 1]) acc[acc.length - 1].push(entry);
      }
      return acc;
    }, [])
    .reduce((acc, shift) => {
      // create an object of guard objects, each with a 'shifts' property
      const guardId = shift[0].split(' ')[3];
      if (!acc[guardId]) {
        acc[guardId] = { shifts: {} };
      }

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
      }

      return acc;
    }, {});

  // find the sleepiest guard
  const sleepyGuards = Object.keys(dataByShift)
    .filter((guardId) => {
      return dataByShift[guardId].totalMinsAsleep;
    })
    .sort((a, b) => {
      return dataByShift[b].totalMinsAsleep - dataByShift[a].totalMinsAsleep;
    })
    .reduce((acc, guardId) => {
      acc[guardId] = { ...dataByShift[guardId] };
      return acc;
    }, {});

  const sleepiestGuard = dataByShift[Object.keys(sleepyGuards)[0]];
  const sleepiestGuardId = Number(Object.keys(sleepyGuards)[0].substring(1)); // we got em, save this for the end

  const sleepiestGuardTimes = [];
  Object.values(sleepiestGuard.shifts).forEach((sleepyTime) => {
    if (Object.keys(sleepyTime).length > 1) {
      sleepiestGuardTimes.push({ [Object.keys(sleepyTime)[0]]: sleepyTime[Object.keys(sleepyTime)[0]]  });
      sleepiestGuardTimes.push({ [Object.keys(sleepyTime)[1]]: sleepyTime[Object.keys(sleepyTime)[1]]  });
    } else {
      sleepiestGuardTimes.push(sleepyTime);
    }
  })

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

    const sleepiestMinute = Number(Object.keys(minuteCount).sort((a, b) => {
      return minuteCount[b] - minuteCount[a];
    })[0].substring(3)); // that's the one

    return sleepiestGuardId * sleepiestMinute; // booyah
}

console.log(reposeRecord());

module.exports = { reposeRecord };
