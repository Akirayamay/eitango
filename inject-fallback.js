const fs = require('fs');
const htmlPath = 'english-express.html';
const fb1 = fs.readFileSync('_fb1.txt', 'utf8').trim();
const fb2 = fs.readFileSync('_fb2.txt', 'utf8').trim();
const fb3 = fs.readFileSync('_fb3.txt', 'utf8').trim();
const fb4 = fs.readFileSync('_fb4.txt', 'utf8').trim();

let html = fs.readFileSync(htmlPath, 'utf8');

// Replace each level's array: match from "N: [" to "\n                ]," (before next level or })
const repl1 = /(                1: \[\s*)[\s\S]*?(\n                \],\n                2: \[\s*)/;
const repl2 = /(                2: \[\s*)[\s\S]*?(\n                \],\n                3: \[\s*)/;
const repl3 = /(                3: \[\s*)[\s\S]*?(\n                \],\n                4: \[\s*)/;
const repl4 = /(                4: \[\s*)[\s\S]*?(\n                \]\n            \};)/;

if (repl1.test(html)) {
  html = html.replace(repl1, '$1' + fb1 + '$2');
  console.log('Replaced level 1');
}
if (repl2.test(html)) {
  html = html.replace(repl2, '$1' + fb2 + '$2');
  console.log('Replaced level 2');
}
if (repl3.test(html)) {
  html = html.replace(repl3, '$1' + fb3 + '$2');
  console.log('Replaced level 3');
}
if (repl4.test(html)) {
  html = html.replace(repl4, '$1' + fb4 + '$2');
  console.log('Replaced level 4');
}

fs.writeFileSync(htmlPath, html);
console.log('Done');
