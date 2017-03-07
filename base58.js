const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const base = alphabet.length;

// a refactor ??
function encode(num) {
  let encoded = '';
  let n = num + 0;
  while (n) {
    const remainder = n % base;
    n = Math.floor(n / base);
    encoded = alphabet[remainder].toString().concat(encoded);
  }
  return encoded;
}

// a refactor
function decode(str) {
  let decoded = 0;
  let s = str.concat();
  while (s) {
    const index = alphabet.indexOf(s[0]);
    const power = s.length - 1;
    // decoded += index * (base ** (s.length - 1));
    decoded += index * (Math.pow(base, power));
    s = s.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
