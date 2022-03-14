const testData = "[1518-11-01 00:00] Guard #10 begins shift\n[1518-11-01 00:05] falls asleep\n[1518-11-01 00:25] wakes up\n[1518-11-01 00:30] falls asleep\n[1518-11-01 00:55] wakes up\n[1518-11-01 23:58] Guard #99 begins shift\n[1518-11-02 00:40] falls asleep\n[1518-11-02 00:50] wakes up\n[1518-11-03 00:05] Guard #10 begins shift\n[1518-11-03 00:24] falls asleep\n[1518-11-03 00:29] wakes up\n[1518-11-04 00:02] Guard #99 begins shift\n[1518-11-04 00:36] falls asleep\n[1518-11-04 00:46] wakes up\n[1518-11-05 00:03] Guard #99 begins shift\n[1518-11-05 00:45] falls asleep\n[1518-11-05 00:55] wakes up\n";

const expectedDataByShift = [
  [
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-01 00:55] wakes up'
  ],
  [
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up'
  ],
  [
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-03 00:29] wakes up'
  ],
  [
    '[1518-11-04 00:02] Guard #99 begins shift',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-04 00:46] wakes up'
  ],
  [
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-05 00:55] wakes up'
  ]
];

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

const expectedSleepiestGuard =     {
  sleepiestGuard: {
    shifts: {
      '1518-11-01 00:00': {
        "00:05": 20,
        "00:30": 25,
      },
      '1518-11-03 00:05': {
        "00:24": 5,
      } },
    numOfSleepPeriods: 3,
    totalMinsAsleep: 50
  },
  sleepiestGuardId: 10
};

module.exports = {
  testData,
  expectedDataByShift,
  expectedDataByGuard,
  expectedSleepiestGuard
};
