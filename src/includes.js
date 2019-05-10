const input = 'Hello World!';

require('./benchmarkRunner')({
  regex: () => /o/.test(input),
  indexOf: () => input.indexOf('o') > -1,
  includes: () => input.includes('o'),
  forLoop: () => {
    for (var i = 0; i < input.length; i++) {
      if (input[i] === 'o') return true;
    }
    return false;
  }
});
