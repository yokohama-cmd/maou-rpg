# 動きと見た目のレシピ集（素のHTML／CSS／JavaScript）

素材サイトに接続できない環境でも「それっぽい」ではなく「プロっぽい」仕上がりを出すための、そのまま使える実装集です。
どれも一般的な技法を自前で書いたもので、特定サイトのコードの写しではありません（利用条件の心配なし）。
各レシピは Chromium で表示・動作を確認済みです（2026-09）。

- クラス名・アニメーション名はすべて `q-` で始まります。既存プロジェクトに入れるときは、既存の名前とぶつからない接頭辞にそろえて置き換えてください。
- 色は `--accent`（強調色）、`--surface`（面の色）、`--ink`（文字色）などの変数から取ります。**既存プロジェクトに同名の変数がある場合は上書きしないこと**（例：既存の `--ink` を再定義すると全体の文字色が変わる）。
- 1画面に入れる「見せ場の演出」は1〜2個まで。残りは控えめな動き（ホバー・押下・登場）にとどめると上品にまとまります。

## 目次
0. [動きの共通設定（必ず最初に入れる）](#r0)
1. [押し心地のあるボタン](#r1)
2. [グラデーションが流れるボタン](#r2)
3. [縁を光が回る枠（ボーダービーム）](#r3)
4. [光が走る文字（シマー）](#r4)
5. [残り火のように揺らめく文字（エンバーグロウ）](#r5)
6. [ときどき乱れる文字（グリッチ）](#r6)
7. [タイプライター表示（日本語対応）](#r7)
8. [1文字ずつ浮かび上がる文字](#r8)
9. [数字のカウントアップ](#r9)
10. [弾んで伸びる進捗バー](#r10)
11. [揺れ（エラー・被ダメージ）](#r11)
12. [トースト通知](#r12)
13. [スクロールで順番に登場](#r13)
14. [読み込み中の骨組み表示（スケルトン）](#r14)
15. [円形スピナー](#r15)
16. [流れ星の背景](#r16)
17. [マウスに追従するスポットライト](#r17)
18. [すりガラスのパネル](#r18)
19. [紙吹雪（canvas-confetti）](#r19)
20. [連続演出をまとめる（Anime.js v4）](#r20)

---

<a id="r0"></a>
## 0. 動きの共通設定（必ず最初に入れる）
時間と動き方（イージング）を変数で統一すると、画面全体の動きに一体感が出ます。端末の「視差効果を減らす」設定の人には動きを止めます。

```css
:root{
  --dur-micro:140ms;   /* 押す・色が変わるなど小さな反応 */
  --dur-ui:240ms;      /* 開く・切り替わるなど画面部品の変化 */
  --dur-enter:560ms;   /* 登場 */
  --ease-out:cubic-bezier(.22,1,.36,1);      /* すっと止まる（登場・移動の基本） */
  --ease-spring:cubic-bezier(.34,1.56,.64,1); /* 少し行き過ぎて戻る（押し心地・通知） */
  --ease-in-out:cubic-bezier(.65,0,.35,1);   /* 行って戻る・繰り返し */
}
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.01ms !important;animation-iteration-count:1 !important;animation-delay:0s !important;
    transition-duration:.01ms !important;transition-delay:0s !important;scroll-behavior:auto !important;
  }
}
```
```js
// 動きを減らす設定かどうか（JSの演出で使う）
const qReduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
```

<a id="r1"></a>
## 1. 押し心地のあるボタン
ホバーで少し浮き、押すと沈んで弾んで戻ります。タッチ端末用の `:active` とキーボード用の `:focus-visible` も必ず付けます。押せる大きさは高さ44px以上。

```css
.q-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5em;
  min-height:44px;padding:0 1.25em;border:0;border-radius:12px;
  background:var(--accent,#5b5bd6);color:#fff;font:inherit;font-weight:600;cursor:pointer;
  box-shadow:0 1px 0 rgba(255,255,255,.25) inset,0 8px 18px -8px color-mix(in srgb,var(--accent,#5b5bd6) 80%,transparent);
  transition:transform var(--dur-ui) var(--ease-spring),box-shadow var(--dur-ui) var(--ease-out),filter var(--dur-micro);
}
.q-btn:hover{transform:translateY(-2px);filter:brightness(1.07)}
.q-btn:active{transform:translateY(0) scale(.96);transition-duration:var(--dur-micro)}
.q-btn:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,#5b5bd6) 45%,white);outline-offset:3px}
.q-btn.is-ghost{background:transparent;color:var(--accent,#5b5bd6);box-shadow:inset 0 0 0 1.5px currentColor}
```
```html
<button class="q-btn">申し込む</button> <button class="q-btn is-ghost">詳しく見る</button>
```

<a id="r2"></a>
## 2. グラデーションが流れるボタン
背景を2倍幅にしておき、ホバー／押下で位置をずらすだけ。スマホでは押したときに動きます。

```css
.q-grad{
  background-image:linear-gradient(90deg,var(--g1,#ff5f6d),var(--g2,#ffc371),var(--g1,#ff5f6d));
  background-size:200% 100%;background-position:0% 50%;
  transition:background-position .7s var(--ease-out),transform var(--dur-ui) var(--ease-spring);
}
.q-grad:hover,.q-grad:active{background-position:100% 50%}
```
```html
<button class="q-btn q-grad">はじめる</button>
```

<a id="r3"></a>
## 3. 縁を光が回る枠（ボーダービーム）
特別なカード（おすすめプラン・レア項目）に。`@property` 非対応の古いブラウザでは光が止まるだけで、表示は崩れません。

```css
@property --q-angle{syntax:'<angle>';initial-value:0deg;inherits:false}
.q-beam{position:relative;border-radius:16px;background:var(--surface,#15151c)}
.q-beam::before{
  content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;
  background:conic-gradient(from var(--q-angle),transparent 0 70%,var(--accent,#8b8bff) 85%,transparent 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  animation:q-spin-angle 4s linear infinite;
}
@keyframes q-spin-angle{to{--q-angle:360deg}}
```
```html
<div class="q-beam" style="padding:20px">おすすめ</div>
```

<a id="r4"></a>
## 4. 光が走る文字（シマー）
見出しやロゴに。光の色は `--shine`。

```css
.q-shimmer{
  background:linear-gradient(100deg,var(--ink,#222) 40%,var(--shine,#fff) 50%,var(--ink,#222) 60%);
  background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:q-shimmer 3.2s var(--ease-in-out) infinite;
}
@keyframes q-shimmer{from{background-position:100% 0}to{background-position:0% 0}}
```
注意：文字の形に背景を切り抜く方式なので、`text-shadow` を足すと影が文字の上に乗って濁ります。

<a id="r5"></a>
## 5. 残り火のように揺らめく文字（エンバーグロウ）
暗い背景の見出しに。炎系の色を変数にすれば青い魔法の光などにも変えられます。

```css
.q-ember{
  color:var(--ember-core,#ffe2b0);
  text-shadow:0 0 4px var(--ember-1,#ff9a3c),0 0 12px var(--ember-2,#ff5a1f),0 0 28px var(--ember-3,rgba(255,60,0,.55));
  animation:q-flicker 2.8s ease-in-out infinite;
}
@keyframes q-flicker{
  0%,100%{text-shadow:0 0 4px var(--ember-1,#ff9a3c),0 0 12px var(--ember-2,#ff5a1f),0 0 28px var(--ember-3,rgba(255,60,0,.55))}
  45%{text-shadow:0 0 3px var(--ember-1,#ff9a3c),0 0 8px var(--ember-2,#ff5a1f),0 0 18px var(--ember-3,rgba(255,60,0,.55))}
  55%{text-shadow:0 0 6px var(--ember-1,#ff9a3c),0 0 18px var(--ember-2,#ff5a1f),0 0 38px var(--ember-3,rgba(255,60,0,.55))}
}
```
既存の見出しが「グラデーションを文字の形に切り抜く」作りのときは、`color` を変えずに `filter:drop-shadow(...)` で光だけ足します。

<a id="r6"></a>
## 6. ときどき乱れる文字（グリッチ）
常に乱れていると読みにくいので、数秒に一瞬だけ乱れる作りです。`data-text` に同じ文字を入れます。

```css
.q-glitch{position:relative;display:inline-block}
.q-glitch::before,.q-glitch::after{content:attr(data-text);position:absolute;inset:0;pointer-events:none;opacity:0}
.q-glitch::before{color:#0ff;clip-path:inset(0 0 58% 0);animation:q-glitch-a 2.6s steps(1) infinite}
.q-glitch::after{color:#f0f;clip-path:inset(52% 0 0 0);animation:q-glitch-b 2.6s steps(1) infinite}
@keyframes q-glitch-a{0%,91%,100%{opacity:0;transform:none}92%{opacity:.85;transform:translate(-3px,-1px)}95%{opacity:.85;transform:translate(2px,1px)}}
@keyframes q-glitch-b{0%,89%,100%{opacity:0;transform:none}90%{opacity:.85;transform:translate(3px,1px)}94%{opacity:.85;transform:translate(-2px,0)}}
```
```html
<span class="q-glitch" data-text="CRITICAL!">CRITICAL!</span>
```

<a id="r7"></a>
## 7. タイプライター表示（日本語対応）
CSSだけの方式（`steps()` と `ch` 単位）は半角の固定文字数でしか正しく動かないため、長さが変わる文章や日本語はJSで1文字ずつ出します。句読点では少し間を置きます。

```css
.q-caret::after{content:"";display:inline-block;width:.08em;height:1em;margin-left:.06em;background:currentColor;vertical-align:-.12em;animation:q-blink 1s steps(1) infinite}
@keyframes q-blink{50%{opacity:0}}
```
```js
function qType(el, text, { speed = 38, delay = 0 } = {}) {
  el.setAttribute('aria-label', text);          // 読み上げソフトには全文を渡す
  if (qReduce()) { el.textContent = text; return Promise.resolve(); }
  const chars = [...text];                        // 絵文字なども1文字として扱う
  el.textContent = ''; el.classList.add('q-caret');
  return new Promise(resolve => {
    let i = 0;
    const tick = () => {
      el.textContent += chars[i++];
      if (i < chars.length) setTimeout(tick, /[、。！？!?]/.test(chars[i - 1]) ? speed * 6 : speed);
      else { el.classList.remove('q-caret'); resolve(); }
    };
    setTimeout(tick, delay);
  });
}
```

<a id="r8"></a>
## 8. 1文字ずつ浮かび上がる文字
ぼかしから浮かび上がる登場演出。日本語は1文字単位、英語は単語単位（`by:'word'`）が自然です。200文字を超える長文には使わないでください（要素が増えて重くなります）。

```css
.q-rv{display:inline-block;white-space:pre;opacity:0;filter:blur(6px);transform:translateY(.3em);
  animation:q-rv .6s var(--ease-out) forwards;animation-delay:calc(var(--i) * var(--q-step,28ms))}
@keyframes q-rv{to{opacity:1;filter:blur(0);transform:none}}
```
```js
function qReveal(el, { by = 'char' } = {}) {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  const parts = by === 'word' ? text.split(/(\s+)/) : [...text];
  el.textContent = '';
  parts.forEach((p, i) => {
    const s = document.createElement('span');
    s.textContent = p; s.className = 'q-rv'; s.style.setProperty('--i', i); s.setAttribute('aria-hidden', 'true');
    el.appendChild(s);
  });
}
```

<a id="r9"></a>
## 9. 数字のカウントアップ
売上・人数・獲得ポイントなどに。桁区切り付きで、最後はゆっくり止まります。数字の幅が揺れないよう `tabular-nums` を指定します。

```css
.q-num{font-variant-numeric:tabular-nums}
```
```js
function qCountUp(el, to, { from = 0, duration = 1200, decimals = 0, prefix = '', suffix = '', locale = 'ja-JP' } = {}) {
  const fmt = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const show = v => { el.textContent = prefix + fmt.format(v) + suffix; };
  if (qReduce()) { show(to); return; }
  const t0 = performance.now(), ease = t => 1 - Math.pow(1 - t, 3);
  const frame = now => {
    const t = Math.min(1, (now - t0) / duration);
    show(from + (to - from) * ease(t));
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
```
```html
<span class="q-num" id="sales">0</span>
<script>qCountUp(document.getElementById('sales'), 12840, { suffix: '件' });</script>
```
画面に入ったときに始めたい場合は、レシピ13の `qOnVisible` と組み合わせます。

<a id="r10"></a>
## 10. 弾んで伸びる進捗バー
幅ではなく `transform:scaleX` を動かすので滑らかです。値は `--p`（0〜1）で渡します。

```css
.q-track{height:10px;border-radius:99px;background:color-mix(in srgb,currentColor 14%,transparent);overflow:hidden}
.q-fill{height:100%;border-radius:inherit;background:var(--accent,#5b5bd6);transform-origin:left center;
  transform:scaleX(var(--p,0));transition:transform .8s var(--ease-spring)}
```
```js
function qSetProgress(fillEl, ratio) { fillEl.style.setProperty('--p', Math.max(0, Math.min(1, ratio))); }
```

<a id="r11"></a>
## 11. 揺れ（エラー・被ダメージ）
入力ミスや失敗の合図に。同じ要素で何度も揺らせるよう、JSでクラスを付け直します。

```css
@keyframes q-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(2px)}}
.q-shake{animation:q-shake .42s var(--ease-out)}
```
```js
function qShake(el) { el.classList.remove('q-shake'); void el.offsetWidth; el.classList.add('q-shake'); }
```

<a id="r12"></a>
## 12. トースト通知
画面下から少し弾んで出て、数秒で消える知らせ。読み上げソフトにも伝わるよう `aria-live` を付けます。

```css
.q-toast-wrap{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);display:grid;gap:8px;z-index:1000;pointer-events:none;width:min(92vw,420px)}
.q-toast{pointer-events:auto;padding:12px 16px;border-radius:12px;background:var(--surface-2,#1f1f27);color:var(--on-surface,#fff);
  box-shadow:0 12px 30px -12px rgba(0,0,0,.5);animation:q-toast-in .5s var(--ease-spring) both}
.q-toast.is-out{animation:q-toast-out .25s var(--ease-out) forwards}
@keyframes q-toast-in{from{opacity:0;transform:translateY(16px) scale(.96)}}
@keyframes q-toast-out{to{opacity:0;transform:translateY(8px) scale(.98)}}
```
```js
function qToast(message, { ms = 2600 } = {}) {
  let wrap = document.querySelector('.q-toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div'); wrap.className = 'q-toast-wrap';
    wrap.setAttribute('role', 'status'); wrap.setAttribute('aria-live', 'polite');
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div'); t.className = 'q-toast'; t.textContent = message;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('is-out'); t.addEventListener('animationend', () => t.remove(), { once: true }); }, ms);
}
```

<a id="r13"></a>
## 13. スクロールで順番に登場
カードや一覧が、画面に入ったときに少しずつ時間差で浮かび上がります。JSが動かない環境でも中身が消えないよう、`html` に `js` クラスが付いたときだけ隠します。`--i` に並び順を入れると時間差になります。

```css
.js .q-reveal{opacity:0;transform:translateY(14px);
  transition:opacity var(--dur-enter) var(--ease-out),transform var(--dur-enter) var(--ease-out);
  transition-delay:calc(var(--i,0) * 60ms)}
.js .q-reveal.is-in{opacity:1;transform:none}
@media print{.js .q-reveal{opacity:1 !important;transform:none !important}}  /* 印刷で中身が消えないように */
```
注意：画面に入ったときに表示する仕組みなので、印刷や「ページ全体のスクリーンショット」では、まだ通過していない部分が空白になります。印刷用の指定（上の `@media print`）を必ず入れ、確認で全体を撮るときはゆっくり最後までスクロールしてから撮ります（`scripts/check_page.js` はそうしています）。
```js
document.documentElement.classList.add('js');
function qOnVisible(elements, callback, { threshold = 0.15 } = {}) {
  const els = [...elements];
  if (!('IntersectionObserver' in window)) { els.forEach(callback); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { callback(e.target); io.unobserve(e.target); }
  }), { threshold });
  els.forEach(el => io.observe(el));
}
qOnVisible(document.querySelectorAll('.q-reveal'), el => el.classList.add('is-in'));
```

<a id="r14"></a>
## 14. 読み込み中の骨組み表示（スケルトン）
中身が届くまで、形だけの灰色の枠を光らせておく表示。くるくる回るだけの表示より待ち時間が短く感じられます。

```css
.q-skel{border-radius:8px;
  background:linear-gradient(90deg,var(--sk-1,#e7e7ee) 25%,var(--sk-2,#f5f5f9) 50%,var(--sk-1,#e7e7ee) 75%);
  background-size:300% 100%;animation:q-skel 1.4s ease-in-out infinite}
@keyframes q-skel{from{background-position:100% 0}to{background-position:0 0}}
```
```html
<div class="q-skel" style="height:14px;width:60%"></div>
```

<a id="r15"></a>
## 15. 円形スピナー
線が伸び縮みしながら回る、定番の読み込み表示。色は周りの文字色（`currentColor`）に合わせて自動で変わります。

```css
.q-spinner{width:40px;height:40px;animation:q-rot 1.4s linear infinite}
.q-spinner circle{fill:none;stroke:currentColor;stroke-width:4;stroke-linecap:round;animation:q-dash 1.4s var(--ease-in-out) infinite}
@keyframes q-rot{to{transform:rotate(360deg)}}
@keyframes q-dash{0%{stroke-dasharray:1 150;stroke-dashoffset:0}50%{stroke-dasharray:90 150;stroke-dashoffset:-35}100%{stroke-dasharray:90 150;stroke-dashoffset:-124}}
```
```html
<svg class="q-spinner" viewBox="0 0 50 50" role="img" aria-label="読み込み中"><circle cx="25" cy="25" r="20"/></svg>
```

<a id="r16"></a>
## 16. 流れ星の背景
暗いヒーロー（ページ最上部の大きな見出し部分）の背景に。数は10〜16本程度に抑えます。

```css
.q-sky{position:relative;overflow:hidden;isolation:isolate}
.q-meteor{position:absolute;top:-10%;left:var(--x);z-index:-1;width:2px;height:2px;border-radius:50%;
  background:#fff;box-shadow:0 0 6px 2px rgba(255,255,255,.45);opacity:0;
  animation:q-meteor var(--d,6s) linear infinite;animation-delay:var(--delay,0s)}
.q-meteor::after{content:"";position:absolute;top:50%;left:0;width:90px;height:1px;transform:translateY(-50%);
  background:linear-gradient(90deg,rgba(255,255,255,.7),transparent)}
@keyframes q-meteor{0%{opacity:0;transform:rotate(215deg) translateX(0)}6%{opacity:1}70%{opacity:1}100%{opacity:0;transform:rotate(215deg) translateX(-720px)}}
```
```js
function qMeteors(container, count = 14) {
  for (let i = 0; i < count; i++) {
    const m = document.createElement('span');
    m.className = 'q-meteor'; m.setAttribute('aria-hidden', 'true');
    m.style.setProperty('--x', (Math.random() * 110 - 10).toFixed(1) + '%');
    m.style.setProperty('--delay', (Math.random() * 8).toFixed(2) + 's');
    m.style.setProperty('--d', (4 + Math.random() * 5).toFixed(2) + 's');
    container.appendChild(m);
  }
}
```

<a id="r17"></a>
## 17. マウスに追従するスポットライト
カードの上でマウスを動かすと、その位置がほんのり光ります。スマホでは触った位置が光ります。

```css
.q-spot{position:relative;overflow:hidden;border-radius:16px;background:var(--surface,#15151c);isolation:isolate}
.q-spot::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--accent,#8b8bff) 30%,transparent),transparent 70%);
  opacity:0;transition:opacity var(--dur-ui) var(--ease-out)}
.q-spot:hover::before,.q-spot:focus-within::before{opacity:1}
```
```js
function qSpotlight(el) {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
}
```

<a id="r18"></a>
## 18. すりガラスのパネル
写真や色の上に重ねる半透明の板。背景がないと効果が見えないので、写真・グラデーションの上で使います。非対応ブラウザでは不透明に近い板になります。

```css
.q-glass{background:color-mix(in srgb,var(--glass-tint,#ffffff) 14%,transparent);border:1px solid rgba(255,255,255,.22);border-radius:18px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 12px 40px -12px rgba(0,0,0,.45);
  -webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4)}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){
  .q-glass{background:color-mix(in srgb,var(--glass-tint,#ffffff) 85%,transparent)}
}
```
Apple風の「背景がゆがむガラス」（Liquid Glass）は Chrome／Edge 以外では効かず重くもなるので、まずはこの控えめな版で十分です。

<a id="r19"></a>
## 19. 紙吹雪（canvas-confetti）
完了・達成の瞬間に。自作せず、定番の無料ライブラリ canvas-confetti（ISCライセンス＝MITに近い自由なライセンス）を使うのが軽くて確実です。「動きを減らす」設定の人には自動で出ません。

```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.js"></script>
```
```js
function qCelebrate(colors = ['#ffd166', '#ef476f', '#06d6a0', '#118ab2']) {
  if (typeof confetti !== 'function') return;   // 読み込めなかったときは何もしない
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors, disableForReducedMotion: true });
}
```

<a id="r20"></a>
## 20. 連続演出をまとめる（Anime.js v4）
「揺れる → 数字が浮かぶ → バーが減る」のように、複数の動きを順番・同時に組み合わせるときは Anime.js が便利です（MITライセンス）。単発の動きならCSSで十分なので、無理に使わないこと。

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.umd.min.js"></script>
```
```js
const { animate, createTimeline, stagger } = anime;

// 一覧を時間差で登場させる
const intro = animate('.q-list > *', { opacity: [0, 1], translateY: [16, 0], delay: stagger(60), duration: 600, ease: 'outCubic' });

// 連続演出（'<' は直前の動きの終わり、'<<' は直前の動きの始まり、'-=200' は200ミリ秒前倒し）
const tl = createTimeline({ defaults: { duration: 400, ease: 'outQuad' } });
tl.add('.q-target', { translateX: [0, -6, 5, -3, 0], duration: 420 })
  .add('.q-pop', { opacity: [0, 1], translateY: [0, -24], scale: [0.6, 1.1, 1] }, '-=200')
  .add('.q-bar', { scaleX: 0.42, ease: 'outBack(1.4)' }, '<<');

// Anime.js は「動きを減らす」設定を自動では見ないので、その人には最終状態だけを見せる
if (qReduce()) { intro.complete(); tl.complete(); }
```
書き方の注意：AIは古い v3 の書き方（`anime({ targets: ... })`、`easing:` という名前）を出しがちです。v4 は `animate(対象, {...})`、イージングは `ease:` と `'outCubic'` などの名前で書きます。配列で3つ以上の値を渡すと、その順に動く連続した動き（キーフレーム）になります。
