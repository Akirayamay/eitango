/**
 * 各レベルを250語のTSL単語リストに置き換える
 * Level 1: part1WordList = vocab600[0:100] + BASIC_EXTRA (TSL 1-250)
 * Level 2: vocabulary600 = vocab600[0:100] + VOCAB600_EXTRA (TSL 251-500)
 * Level 3: newWordList = V730 (TSL 501-750)
 * Level 4: wordList860 = V860 (TSL 751-1000)
 * 実行: node apply-250-words.js
 */
const fs = require('fs');
const path = require('path');
const { BASIC_EXTRA, VOCAB600_EXTRA } = require('./generate-tsl-250.js');
const { V730, V860 } = require('./generate-730-860.js');

function entry(no, en, ja, romaji, pos) {
  const esc = s => (s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `    { no: ${no}, en: "${esc(en)}", ja: "${esc(ja)}", romaji: "${esc(romaji)}", pos: "${esc(pos)}" }`;
}

function toEntries(arr) {
  return arr.map((row, i) => {
    const r = Array.isArray(row) ? row : [row.en, row.ja, row.romaji, row.pos];
    return entry(i + 1, r[0], r[1], r[2], r[3]);
  }).join(',\n');
}

const dir = __dirname;
const w630 = fs.readFileSync(path.join(dir, 'wordList630.js'), 'utf8');
const match630 = w630.match(/const vocabulary600 = \[([\s\S]*?)\n\];/);
if (!match630) throw new Error('vocabulary600 not found');
const entries630 = match630[1].match(/\{\s*no:\s*\d+,\s*en:\s*"([^"]+)",\s*ja:\s*"([^"]*)",\s*romaji:\s*"([^"]*)",\s*pos:\s*"([^"]*)"\s*\}/g) || [];
const base100 = entries630.slice(0, 100).map(m => {
  const e = m.match(/en:\s*"([^"]+)"/)[1];
  const j = m.match(/ja:\s*"([^"]*)"/)[1];
  const r = m.match(/romaji:\s*"([^"]*)"/)[1];
  const p = m.match(/pos:\s*"([^"]*)"/)[1];
  return [e, j, r, p];
});

const part1_250 = [...base100, ...BASIC_EXTRA].slice(0, 250);
const vocab600_250 = [...base100, ...VOCAB600_EXTRA].slice(0, 250);

let wl = fs.readFileSync(path.join(dir, 'wordList.js'), 'utf8');
wl = wl.replace(/const newWordList = \[[\s\S]*?\n\];/, `const newWordList = [\n${toEntries(V730.slice(0, 250))}\n];`);
wl = wl.replace(/const wordList860 = \[[\s\S]*?\n\];/, `const wordList860 = [\n${toEntries(V860.slice(0, 250))}\n];`);
wl = wl.replace(/const part1WordList = \[[\s\S]*?\n\];/, `const part1WordList = [\n${toEntries(part1_250)}\n];`);
fs.writeFileSync(path.join(dir, 'wordList.js'), wl);

const vocab600Str = `// Level 2（目標600点レベル）用単語リスト - 250語（TSL 251-500）
const vocabulary600 = [\n${toEntries(vocab600_250)}\n];
const wordList630 = vocabulary600;`;
const w630New = w630.replace(/\/\/ Level 2[\s\S]*?const vocabulary600 = \[[\s\S]*?\n\];\s*(?:const wordList630[^;]*;\s*)?/, vocab600Str + '\n');
fs.writeFileSync(path.join(dir, 'wordList630.js'), w630New);

console.log('Done: part1WordList(250), vocabulary600(250), newWordList(250), wordList860(250)');
