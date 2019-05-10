const Benchmark = require('benchmark');
const {pipe, map, invertObj, invert, toString} = require('ramda');

module.exports = funcs => {
  const suite = new Benchmark.Suite()
    .on('cycle', ({target}) => console.log(String(target)))
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    });

  const answers = pipe(
    map(f => toString(f())),
    invert,
    invertObj
  )(funcs);

  if (Object.keys(answers).length > 1) {
    console.error('Not all functions give same answers!', answers);
    return;
  }

  for (const name in funcs) {
    suite.add(name, funcs[name]);
  }

  console.log('Testing...');
  suite.run({async: true});
};
