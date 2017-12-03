const findIndexPredicate = (value) => (item) => item.t === value;

const linearInterpolate = (before, after, atPoint) => before.v + (after.v - before.v) * atPoint;

const interpolate = (data, count) => {
  const newData = [ data[0] ];
  const springFactor = (data.length - 1) / (count - 1);

  let tmp, before, after, atPoint;

  for (let i = 1; i < count - 1; i++) {
    tmp = i * springFactor;
    before = Math.floor(tmp).toFixed();
    after = Math.ceil(tmp).toFixed();
    atPoint = tmp - before;

    newData.push({ v: linearInterpolate(data[before], data[after], atPoint) });
  }

  newData.push(data[data.length - 1]);

  return newData;
};

export const getPoints = (width, height) => (source, from, to) => {
  const startIndex = source.findIndex(findIndexPredicate(from));
  const endIndex = source.findIndex(findIndexPredicate(to));

  const sliced = source.slice(startIndex, endIndex);

  return interpolate(sliced, width)
    .map(({v}, index) => ({ x: index, y: width / 2 - v }));
};
