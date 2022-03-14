const sortDataByShift = (data) => {
  return data
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
}

module.exports = { sortDataByShift };
