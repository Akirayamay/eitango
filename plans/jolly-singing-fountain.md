# Plan: Ship-Eigo 全改善項目 包括実装

## Context
Ship-Eigo.com の9項目の改善を一括導入する。
**厳守**: 既存JSロジック・コメント・クラス名は変更しない。追加のみ。

## Target Files
- `english-express.html` — メイン（CSS追加・HTML追加・JS追加）
- `index.html` — SEOメタタグ追加のみ
- `manifest.json` — 新規作成（PWA）
- `sw.js` — 新規作成（PWA Service Worker）

## AppState / LocalStorage キー（参照用）
- `learningHistory[]`: `{date, level, mode, format, score, maxCombo, accuracy, ...}`
- `bestScores{}`: `{lv1_ja-typing_practice: {score, date}}`
- `weakWords{}`: `{[en]: {en, ja, pos, missCount, correctCount}}`
- 新規追加: `shipEigo_aiApiKey`（AIヒント用Anthropic APIキー）

---

## 実装順序と詳細

### 1. SEO強化
**`english-express.html` `<head>` 内（行7付近）に追加:**
```html
<meta name="description" content="Ship Eigo（シップ英語）は、コンベアベルトを流れる英単語をタイピングするゲームです。レベル1〜4対応。無料・登録不要。">
<meta name="keywords" content="英単語,タイピングゲーム,英語学習,ship eigo,シップ英語,無料">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://ship-eigo.web.app/english-express.html">
```
**JSON-LDを `</head>` 直前に追加（WebApplication schema）**

**`index.html` 行5付近に追加:**
```html
<meta name="description" content="Ship Eigo - 楽しく学べる英単語タイピングゲーム。無料・登録不要。">
<meta name="robots" content="noindex, follow">
```

---

### 2. アクセシビリティ
既存ボタン群に `aria-label` 属性を追加（HTML構造は変更しない）:
- レベルボタン4本（行2171-2174）
- メニューボタン5本（行2196-2210）
- リザルト画面ボタン群（行2381-2387）
- `#mobile-input` に `aria-hidden="true"` 追加
- `.screen` に `role="main"` / `role="region"` 追加

---

### 3. ダークモード
**CSSブロック末尾に `@media (prefers-color-scheme: dark)` を追加:**
- `:root` 変数の上書き（`--bg-color: #0f172a` 等）
- `.screen`, `#preview-screen`, `#result-screen` の背景
- `.btn-lvl`, `.btn-mode`, `.hud-bar`, `.score-box`, `.toast`
- 各パネル（`#title-bestscore-panel`, `#title-bgm-panel`）
- モーダル内コンテナ（`#history-modal > div` 等）

---

### 4. 画面遷移アニメーション
**CSSブロック末尾（ダークモードの直後）に追加:**
```css
@keyframes screenFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0);    }
}
.screen:not(.hidden),
#preview-screen:not(.hidden),
#result-screen:not(.hidden) {
    animation: screenFadeIn 0.28s cubic-bezier(0.4,0,0.2,1) both;
}
```
JSの変更は不要（`.hidden` の付け外しに自動連動）。

---

### 5. Mobile UX（visualViewport）
**`<script>` ブロック末尾付近（行7610前後）に追記:**
```javascript
(function initVisualViewport() {
    if (!window.visualViewport || !isMobile) return;
    const gc = document.getElementById('game-container');
    if (!gc) return;
    function onVVResize() {
        const kbH = Math.max(0, window.innerHeight - window.visualViewport.height);
        if (kbH > 50) {
            gc.style.height = window.visualViewport.height + 'px';
        } else {
            gc.style.height = '100vh';
        }
    }
    window.visualViewport.addEventListener('resize', onVVResize);
})();
```

---

### 6. SNSシェア機能
**HTML追加（リザルト画面 行2387の `</div>` 直後）:**
```html
<div style="display:flex;gap:10px;justify-content:center;margin-top:5px;">
    <button onclick="shareScore()" aria-label="スコアをSNSでシェアする"
        style="padding:10px 20px;background:linear-gradient(135deg,#1da1f2,#0d8ecf);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:bold;box-shadow:0 4px 14px rgba(29,161,242,0.4);">
        🐦 スコアをシェア
    </button>
</div>
```
**JS追加（`</script>` 前）:**
```javascript
function shareScore() {
    const score = document.getElementById('final-score')?.innerText || '0';
    const rank  = document.getElementById('final-rank')?.innerText  || '';
    const acc   = document.getElementById('final-accuracy')?.innerText || '';
    const combo = document.getElementById('final-combo')?.innerText || '0';
    const text = `【Ship Eigo】スコア:${score}点 / 役職:${rank} / 正解率:${acc} / コンボ:${combo}\n#ShipEigo #英単語タイピング`;
    const url  = 'https://ship-eigo.web.app/';
    if (navigator.share) {
        navigator.share({ title:'Ship Eigo スコア', text, url }).catch(()=>{});
    } else {
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text+'\n'+url),
            '_blank','noopener,noreferrer');
    }
}
window.shareScore = shareScore;
```

---

### 7. 統計ダッシュボード
**CDN追加（`<head>` 内）:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js" defer></script>
```
**HTML追加（`#history-modal` の直前、行2508付近）:**
- `#stats-modal`（既存モーダルと同パターン: `position:fixed; z-index:1000`）
- サマリーカード3枚（総プレイ数・平均正解率・累計スコア）
- Canvas 2枚（`#stats-score-chart`, `#stats-accuracy-chart`）
- レベル別成績グリッド（`#stats-level-breakdown`）
- 苦手単語TOP10リスト（`#stats-weak-words`）

**メニューボタン追加（行2210直前）:**
```html
<button onclick="openStatsModal()" aria-label="統計を開く" style="...">📈 統計</button>
```

**JS追加（`</script>` 前）:**
- `let statsChartInstances = {};`
- `openStatsModal()` → `stats-modal` を表示 → `renderStatsModal()` 呼び出し
- `renderStatsModal()` → `AppState.learningHistory` / `weakWords` を読み取り、Chart.js描画
  - スコア推移: line chart（直近20件）
  - 正解率推移: bar chart（色: ≥80%緑・≥60%黄・他赤）
  - レベル別: 4グリッドカード
  - 苦手単語: TOP10テーブル行

---

### 8. AIヒント機能（Anthropic API直接呼び出し）
**メニューボタン追加（行2210直前）:**
```html
<button onclick="openAiSettingsModal()" aria-label="AIヒントを開く" style="...color:#7c3aed">🤖 AI ヒント</button>
```

**HTML追加（`#username-modal` の直前）:**
- `#ai-settings-modal`: APIキー入力フォーム（`type="password"` + 保存ボタン）
- `#ai-hint-modal`: AIが生成したHTML結果を表示するスクロールエリア

**JS追加（`</script>` 前）:**
```javascript
function openAiSettingsModal() { /* 保存済みキーを入力欄にセット */ }
function saveAiApiKey() { /* localStorage.setItem('shipEigo_aiApiKey', key) */ }

async function callClaudeAPI(prompt) {
    const apiKey = localStorage.getItem('shipEigo_aiApiKey');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5',
            max_tokens: 1024,
            messages: [{ role:'user', content: prompt }]
        })
    });
    return (await res.json()).content[0]?.text || '';
}

async function generateWordHint() {
    // AppState.weakWords から missCount 上位5単語を抽出
    // プロンプト生成 → callClaudeAPI → #ai-hint-content に innerHTML セット
}
```
> **セキュリティ注意:** APIキーはLocalStorageに保存。モーダル内に「ブラウザにのみ保存」の注意書きを表示。

---

### 9. PWA（オフライン対応）
**`<head>` 内に追加（行6付近）:**
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#2563eb">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Ship Eigo">
```

**`manifest.json` 新規作成:**
```json
{
  "name": "Ship Eigo - 英単語タイピングゲーム",
  "short_name": "Ship Eigo",
  "start_url": "/english-express.html",
  "display": "standalone",
  "background_color": "#f0f2f5",
  "theme_color": "#2563eb",
  "icons": [
    {"src":"icon-192.png","sizes":"192x192","type":"image/png"},
    {"src":"icon-512.png","sizes":"512x512","type":"image/png"}
  ]
}
```

**`sw.js` 新規作成:**
- `install`: `english-express.html`, `wordList.js`, `wordList630.js`, Fontsをキャッシュ
- `activate`: 旧キャッシュを削除
- `fetch`: Firebase/Firestore/AdSenseはキャッシュしない。それ以外はCache-First

**SW登録JS追加（`</script>` 前）:**
```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
        navigator.serviceWorker.register('/sw.js').catch(console.warn));
}
```

---

## Constraints（厳守）
- 既存JSロジック・関数の中身 → 変更禁止
- 既存HTMLの構造・テキスト・クラス名 → 変更禁止（属性追加のみ）
- 既存CSSクラス定義の削除 → 禁止（追加のみ）

## Verification
1. ブラウザで `english-express.html` を開き、全画面（タイトル・プレビュー・ゲーム・リザルト・ギャラリー）の動作確認
2. ダークモード: OSのダークモードをONにして配色確認
3. 画面遷移: 各画面への遷移でフェードインアニメーションが発火することを確認
4. SNSシェア: リザルト画面の「シェア」ボタン動作確認
5. 統計: `openStatsModal()` でChart.jsグラフが描画されることを確認
6. AIヒント: APIキー入力後に苦手単語ヒストが生成されることを確認
7. PWA: Chrome DevTools > Application > Manifest・Service Worker を確認
8. モバイル(375px): 全画面のレスポンシブ確認
