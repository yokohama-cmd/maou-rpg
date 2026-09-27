# 見た目の設計図（デザイントークン）と DESIGN.md のひな形

作り始める前に「色・文字・余白・角丸・影・動き」を数個の変数に決めておくと、画面全体に統一感が出て、あとから直すときも見た目がぶれません。#4 Refero Styles や #11 DESIGNmd が広めている **DESIGN.md**（見た目のルールを1枚にまとめ、AIに読ませるファイル）はこの考え方を文書にしたものです。

## いつ使うか
- 新しく画面を作るとき：まず下の「CSS変数のひな形」を埋めてから部品を作る。
- 既存のプロジェクトを直すとき：既存の `:root` の変数や `DESIGN.md` があればそれに従う（勝手に新しい色を足さない）。何度も修正が入るプロジェクトで DESIGN.md がなければ、今の実装から読み取って作ることを提案する。

## CSS変数のひな形
```css
:root{
  /* 色：面・文字・強調を分ける。強調色（accent）は基本1色＋必要なら補助1色 */
  --bg:#0f1115; --surface:#171a21; --surface-2:#1f232c; --line:#2a2f3a;
  --ink:#e8eaf0; --ink-dim:#9aa3b2;
  --accent:#7c7cff; --accent-ink:#ffffff; --success:#2fbf71; --danger:#ef4f5f;
  /* 文字 */
  --font-sans:"Noto Sans JP",system-ui,sans-serif; --font-display:var(--font-sans);
  --fs-sm:.875rem; --fs-base:1rem; --fs-lg:1.25rem; --fs-xl:1.75rem; --fs-2xl:2.5rem;
  /* 余白（4の倍数でそろえる） */
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-6:24px; --sp-8:32px; --sp-12:48px;
  /* 角丸・影 */
  --radius-sm:8px; --radius:12px; --radius-lg:20px;
  --shadow-1:0 1px 2px rgba(0,0,0,.2); --shadow-2:0 12px 32px -12px rgba(0,0,0,.45);
  /* 動き（motion-recipes.md のレシピ0と共通） */
  --dur-micro:140ms; --dur-ui:240ms; --dur-enter:560ms;
  --ease-out:cubic-bezier(.22,1,.36,1); --ease-spring:cubic-bezier(.34,1.56,.64,1);
}
```
明るい画面にするときは `--bg` `--surface` `--ink` などを入れ替えるだけで済むように、部品側では色を直接書かず、必ずこの変数を使います。

## DESIGN.md のひな形
```markdown
# DESIGN.md — （サービス名／画面名）

## 雰囲気
- 3語で：（例）落ち着いた・信頼感・少し遊び心
- 参考：（例）Refero Styles の「〇〇」、CTA Gallery のダークモードの例

## 色
| 役割 | 変数 | 値 | 使う場所 |
|---|---|---|---|
| 背景 | --bg | #0f1115 | ページ全体 |
| 面 | --surface | #171a21 | カード・パネル |
| 文字 | --ink / --ink-dim | #e8eaf0 / #9aa3b2 | 本文 / 補足 |
| 強調 | --accent | #7c7cff | 主ボタン・リンク・選択中（1画面に多用しない） |

## 文字
- 書体：見出し（　）／本文（　）
- サイズ：--fs-sm 〜 --fs-2xl の5段階だけを使う

## 余白・角丸・影
- 余白は --sp-* の値だけ。カード内は --sp-4〜--sp-6
- 角丸：小部品 --radius-sm、カード --radius、大きなパネル --radius-lg

## 部品
- 主ボタン（1画面に1つ）／副ボタン（枠線のみ）／危険な操作（--danger）
- 通知は Toast、確認は Modal、読み込みは Skeleton（部品名は Component Gallery の呼び方）

## 動き
- 反応 --dur-micro、切り替え --dur-ui、登場 --dur-enter
- 登場は --ease-out、押し心地・通知は --ease-spring
- 見せ場の演出は1画面に1〜2個まで。prefers-reduced-motion では止める

## やらないこと
- 変数にない色・余白を直接書かない
- 既存のクラス名・変数名を変えない（新しいものには接頭辞を付ける）
```
