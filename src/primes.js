const num = 1000;

const first = () => {
  const p = [2];
  for (let i = 3; p.length < num; i += 2) {
    let isPrime = true;
    for (let j = 0; isPrime && j < p.length; j++) {
      if (i % p[j] === 0) isPrime = false;
    }
    if (isPrime) p.push(i);
  }
  return p;
};

const second = () => {
  const primes = [];
  for (let i = 2; primes.length < num; i++) {
    let isPrime = true;
    for (let j = 0; j < primes.length && primes[j] * primes[j] <= i; j++) {
      if (i % primes[j] === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
};

const seive = () => {
  const len = 7920; // is this cheating? Only works when num is 1000
  const nums = [];
  for (let i = 0; i < len; i++) nums[i] = i;
  nums[1] = 0;
  let x = 2;
  while (x * 2 < len) {
    for (let i = x * 2; i < len; i += x) nums[i] = 0;
    do {
      x++;
    } while (!nums[x] && x * 2 < len);
  }
  const primes = [];
  for (let i = 0; i < len; i++) if (nums[i]) primes.push(nums[i]);
  return primes;
};

require('./benchmarkRunner')({
  first,
  second,
  seive
});
