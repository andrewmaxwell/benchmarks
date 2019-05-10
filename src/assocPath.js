const {assocPath} = require('ramda');

const target = {a: {b: [{k: 'stuff'}]}, f: 23};

const update = (path, val, data) => {
  const copy = data.slice();
  copy[path[0]] = myAssocPath(path.slice(1), val, copy[path[0]]);
  return copy;
};

const myAssocPath = (path, val, data) =>
  path.length
    ? typeof path[0] === 'number' && Array.isArray(data)
      ? update(path, val, data)
      : {
          ...data,
          [path[0]]: myAssocPath(path.slice(1), val, (data || {})[path[0]])
        }
    : val;

require('./benchmarkRunner')({
  assocPath: () => assocPath(['a', 'b', 2, 'c'], 10, target),
  myAssocPath: () => myAssocPath(['a', 'b', 2, 'c'], 10, target)
});
