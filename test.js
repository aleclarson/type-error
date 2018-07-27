const tp = require('testpass');

const TypeError = require('.');

function AA() {}
function BB() {}
const nullish = 'null or undefined';
const notNaN = 'anything but NaN';

const cases = [
  [notNaN, NaN,       `Expected ${notNaN}, got NaN`],
  [nullish, true,     `Expected ${nullish}, got true`],
  [Array, null,       'Expected an array, got null'],
  [Function, 27,      'Expected a function, got a number'],
  [AA, {},            'Expected an AA instance, got an object'],
  [Object, new BB(),  'Expected an object, got a BB instance'],
  [Number, /[abc]/g,  'Expected a number, got a regexp'],
];

const log = require('lodge');
cases.forEach(c => {
  const type = c[0];
  const val = c[1];
  const id = `type = ${log.stylize('%O', type)}, value = ${log.stylize('%O', val)}`;
  tp.test(id, t => {
    t.eq(TypeError(type, val).message, c[2]);
    console.debug('\n' + c[2] + '\n');
  });
});
