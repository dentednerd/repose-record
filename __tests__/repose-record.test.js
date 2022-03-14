const {
  sortDataByShift,
  sortShiftDataByGuard,
  findSleepiestGuard,
  findSleepiestMinute
} = require('../utils');
const {
  testData,
  expectedDataByShift,
  expectedDataByGuard,
  expectedSleepiestGuard
} = require('./testData.js');

describe('sortDataByShift', () => {
  test('returns an array of arrays of shift data', () => {
    const actual = sortDataByShift(testData);
    const expected = expectedDataByShift;
    expect(actual).toEqual(expected);
  });
});

describe('sortShiftDataByGuard', () => {
  test('returns an object of objects of guard data', () => {
    const shiftData = sortDataByShift(testData);
    const actual = sortShiftDataByGuard(shiftData);
    const expected = expectedDataByGuard;
    expect(actual).toEqual(expected);
  })
});

describe('#findSleepiestGuard', () => {
  test('returns an object with sleepiestGuard (object) and sleepiestGuardId (number)', () => {
    const shiftData = sortDataByShift(testData);
    const guardData = sortShiftDataByGuard(shiftData);
    const actual = findSleepiestGuard(guardData);
    const expected = expectedSleepiestGuard;
    expect(actual).toEqual(expected);
  });
});

describe('#findSleepiestMinute', () => {
  test('returns a number of the minute the sleepiest guard sleeps through the most', () => {
    const shiftData = sortDataByShift(testData);
    const guardData = sortShiftDataByGuard(shiftData);
    const { sleepiestGuard } = findSleepiestGuard(guardData);
    const actual = findSleepiestMinute(sleepiestGuard);
    expect(actual).toEqual(24);
  })
})
