const { sortDataByShift } = require('./sortDataByShift');
const { sortShiftDataByGuard } = require('./sortShiftDataByGuard');
const { findSleepiestGuard } = require('./findSleepiestGuard');
const { findSleepiestMinute } = require('./findSleepiestMinute');

module.exports = {
  sortDataByShift,
  sortShiftDataByGuard,
  findSleepiestGuard,
  findSleepiestMinute
};
