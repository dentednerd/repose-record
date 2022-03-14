// sortDataByShift creates an array of arrays of entries for each shift

const sortDataByShift = (data) => {
  return data
    .split('\n')
    .sort()
    .reduce((acc, entry) => {
      const isGuard = entry.split(' ')[2] === "Guard";

      if (isGuard) {
        acc.push([ entry ]);
      } else {
        if (acc.length > 0) acc[acc.length - 1].push(entry);
      }

      return acc;
    }, []);
};

module.exports = { sortDataByShift };
