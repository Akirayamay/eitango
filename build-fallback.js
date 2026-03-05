const fs = require('fs');
const wl = fs.readFileSync('wordList.js', 'utf8');
const wl630 = fs.readFileSync('wordList630.js', 'utf8');
const getData1 = new Function(wl + '; return { basicWordList, vocabulary730, vocabulary860 };');
const getData2 = new Function(wl630 + '; return { vocabulary600 };');
const data1 = getData1();
const data2 = getData2();
function toLine(arr) {
  if (!arr || !arr.length) return '';
  return arr.map(w => {
    const en = (w.en || '').replace(/"/g, '\\"');
    const romaji = (w.romaji || '').replace(/"/g, '\\"');
    return '{ no:' + w.no + ', en:"' + en + '", ja:"' + w.ja + '", romaji:"' + romaji + '", pos:"' + (w.pos || '') + '" }';
  }).join(', ');
}
fs.writeFileSync('_fb1.txt', toLine(data1.basicWordList));
fs.writeFileSync('_fb2.txt', toLine(data2.vocabulary600));
fs.writeFileSync('_fb3.txt', toLine(data1.vocabulary730));
fs.writeFileSync('_fb4.txt', toLine(data1.vocabulary860));
console.log('Done', data1.basicWordList?.length, data2.vocabulary600?.length);
