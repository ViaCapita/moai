import { get } from 'ember';
import computed from 'ember/computed';

var alphabet, base;

alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

base = alphabet.length;

export function encode(url, requestId) {
  var s, i = url + "|" + requestId;
  if (i === 0) {
    return alphabet[0];
  }
  s = "";
  while (i > 0) {
    s += alphabet[i % base];
    i = parseInt(i / base, 10);
  }
  return s.split("").reverse().join("");
}

export function decode(s) {
  var c, i, _i, _len;
  i = 0;
  for (_i = 0, _len = s.length; _i < _len; _i++) {
    c = s[_i];
    i = i * base + alphabet.indexOf(c);
  }
  return i;
}

export default function (url, requestId) {
	if(requestId) {
		return encode(url, requestId);
	} else {
		return encode(url, requestId);
	}
}