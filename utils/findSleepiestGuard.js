// findSleepiestGuard returns an object with a sleepiestGuard object and a sleepiestGuardId number

const findSleepiestGuard = (guardData) => {
  const sleepyGuards = Object.keys(guardData)
    .filter((guardId) => {
      return guardData[guardId].totalMinsAsleep;
    })
    .sort((a, b) => {
      return guardData[b].totalMinsAsleep - guardData[a].totalMinsAsleep;
    })
    .reduce((acc, guardId) => {
      acc[guardId] = { ...guardData[guardId] };
      return acc;
    }, {});

  return {
    sleepiestGuard: guardData[Object.keys(sleepyGuards)[0]],
    sleepiestGuardId: Number(Object.keys(sleepyGuards)[0].substring(1))
  };
}

module.exports = { findSleepiestGuard };
