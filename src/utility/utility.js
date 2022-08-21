/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => `${text.split(' ').slice(0, size).join(' ')}...`;

const toUpperCase = (text) => text.toUpperCase();
// Output: FLEXIPLE

const toCapitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
// Output: Abc efg

const toFilter = (str) => {
  let i;
  const frags = str.split('_');
  for (i = 0; i < frags.length; i += frags) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
};
// Output: Humpdey Dumpdey

const numberFormat = (x) => Number.parseFloat(x).toFixed(0);

// Get Date YYYY-MM-DD
const getDate = (str) => {
  if (str !== undefined) {
    const date = new Date(str);
    const mnth = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  return '';
};

module.exports = {
  ellipsis,
  toUpperCase,
  toCapitalize,
  toFilter,
  numberFormat,
  getDate,
};
