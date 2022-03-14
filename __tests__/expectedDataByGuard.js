const expectedDataByGuard = {
  '#10': {
    shifts: {
      '1518-11-01 00:00': {
        "00:05": 20,
        "00:30": 25,
      },
      '1518-11-03 00:05': {
        "00:24": 5,
      }
    },
    numOfSleepPeriods: 3,
    totalMinsAsleep: 50
  },
  '#99': {
    shifts: {
      '1518-11-01 23:58': {
        "00:40": 10,
      },
      '1518-11-04 00:02': {
        "00:36": 10,
      },
      '1518-11-05 00:03': {
        "00:45": 10,
      }
    },
    numOfSleepPeriods: 3,
    totalMinsAsleep: 30
  }
};

module.exports = { expectedDataByGuard };
