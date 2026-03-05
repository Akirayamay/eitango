/**
 * 和訳のカタカナをひらがなに変換する
 * ローマ字は既にアルファベットなので変更なし
 */
const fs = require('fs');
const path = require('path');

function katakanaToHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, (ch) => {
    return String.fromCharCode(ch.charCodeAt(0) - 0x60);
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // 1. オブジェクト形式 ja: "xxx"
  content = content.replace(/ja:\s*"((?:[^"\\]|\\.)*)"/g, (m, inner) => {
    const unescaped = inner.replace(/\\\\/g, '\\').replace(/\\"/g, '"');
    const converted = katakanaToHiragana(unescaped);
    if (converted !== unescaped) {
      const escaped = converted.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `ja: "${escaped}"`;
    }
    return m;
  });
  // 2. 配列形式 ["en","ja","romaji","pos"] の2番目
  content = content.replace(/\["([^"]*)","([^"]*)","([^"]*)","([^"]*)"\]/g, (m, en, ja, romaji, pos) => {
    const converted = katakanaToHiragana(ja);
    if (converted !== ja) {
      return `["${en}","${converted}","${romaji}","${pos}"]`;
    }
    return m;
  });
  fs.writeFileSync(filePath, content);
  console.log('Fixed:', filePath);
}

const dir = __dirname;
['wordList.js', 'wordList630.js', 'generate-tsl-250.js', 'generate-730-860.js'].forEach(f => {
  const p = path.join(dir, f);
  if (fs.existsSync(p)) processFile(p);
});
