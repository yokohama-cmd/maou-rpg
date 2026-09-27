# UI素材カタログ（29件・2026年9月調査）

アニメーション・グラフィック・UIの品質を上げるために厳選された29の素材サイトの、中身・技術構成・料金・利用条件・使いどころ・コードの取り出し方をまとめたものです。
料金はセール価格を含み変わりやすいので、有料プランを勧めるときは「2026年9月時点」と添え、購入前に公式サイトでの確認を促してください。

**接続についての注意**：多くの素材サイトは、作業環境によっては通信制限で開けません（2026年9月の調査時に確認）。その場合でも GitHub（github.com、raw.githubusercontent.com）や npm（registry.npmjs.org）は開けることが多いので、下の「コードの取り出し先」を使います。どれも開けなければ `motion-recipes.md` のレシピで同等の表現を自作します。

## 目次
- A. そのまま貼れるCSS・JavaScript（素のHTMLで使える）… #14, #24, #19, #26, #25, #29
- B. React／Tailwind 用の部品集 … #15, #17, #18, #16, #13, #22, #23, #20, #21, #12
- C. 画像素材（アイコン・イラスト）… #28, #27
- D. 見た目の方向性・AIへの指示書 … #4, #11, #5, #3, #1
- E. 参考ギャラリー（スクショ集）… #2, #6, #7, #8, #9, #10

凡例：【技術】どの環境向けか／【料金】【条件】利用条件（ライセンス）／【向く用途】／【借りたい技】名前で覚えておくと便利な演出／【取り出し先】コードの入手先

---

## A. そのまま貼れるCSS・JavaScript

### #14 Kinetics — kinetics.colorion.co
- 弾む動きのUIアニメーション153種。全種に**CSS版**と**AI用プロンプト**あり（React版は99種のみ）。
- 【技術】素のCSS（`cubic-bezier(0.34,1.56,0.64,1)` など行き過ぎて戻るイージング中心）。一部はJSでクラスを付け外しする前提。
- 【料金】無料 【条件】サイト上に「MIT licensed」表記（正式なLICENSEファイルはなし）。著作権表示のコメントを残す。
- 【向く用途】ボタンの押し込み、通知、数字のカウントアップ、進捗バー、エラー時の揺れ、紙吹雪、タイプライター。
- 【借りたい技】Push Button／Toast Overshoot／Elastic Progress／Error Shake／Odometer Count-up／Confetti Burst／Typewriter／Glitch Text
- 【取り出し先】github.com/ckissi/kinetics（`src/content/body.html` に全パターン）

### #24 CSS Text Effects — text-effects.colorion.co（公式GitHubの案内は texteffects.colorion.co）
- 文字演出90種（オーロラ、グリッチ、空港の案内板風パタパタ、液体が満ちる文字、ブラウン管風、タイプライター、ネオン、残り火 Emberglow など）。CSSのみ・JS不要、AI用プロンプト付き。#14 と同じ作者（Csaba Kissi 氏）。
- 【技術】素のCSS。一部は1文字ずつタグで囲む・`data-text` 属性・SVG などHTML側の工夫が必要。
- 【料金】無料 【条件】READMEに「MIT licensed」（LICENSEファイルはなし）。
- 【注意】コピー用CSSの先頭に `:root{--ink:...}` が入っている。既存の `--ink` を上書きしてしまうので、変数名を変えて効果のクラス内に閉じ込める。書体指定も入っているので必要なら消す。タイプライターは半角10文字前提。
- 【取り出し先】github.com/ckissi/colorion-text-effects（`src/data/effects.ts` に全90種）

### #19 Uiverse — uiverse.io
- 投稿制のUI部品集（ボタン、ローディング、トグル、チェックボックス、カード、入力欄、ツールチップ）。公式GitHub版で3,802個。HTML＋CSSをそのままコピーできる（一部はTailwind版）。
- 【料金】部品は無料（AI生成機能の有料プランの有無は未確認） 【条件】MIT。クレジット表記は任意だが、各部品冒頭の「From Uiverse.io by 作者名」コメントは残すのが無難。
- 【注意】`.btn` `.button` `.loader`、アニメーション名 `pop` `shake` `fade` など、ありふれた名前を使う部品が多い。既存ページに入れるときは接頭辞を付けて衝突を避ける。`tailwind` タグの部品はTailwindが必要。
- 【取り出し先】github.com/uiverse-io/galaxy（`Buttons/` `loaders/` などフォルダ別、2024年9月以降は更新なし）

### #26 Gradient Buttons — gradientbuttons.colorion.co
- グラデーションボタン集（紹介記事では100種以上）。CSSと色コードをワンクリックでコピー。
- 【技術】`background-size:200% auto` にしておき、ホバーで `background-position:right center` にずらして色を流す。
- 【料金】無料 【条件】ボタンCSS自体の明示はなし。運営元規約は「配色は個人・商用とも使用料なし、できればクレジット、そのままの再販は禁止」。同シリーズの他ツールはMIT。一般的な技法なので、自分の配色に書き換えて使えば問題になりにくい。
- 【取り出し先】専用リポジトリは見つからず。技法は `motion-recipes.md` のレシピ2で再現できる。

### #25 Circle Loaders — circleloaders.dominikakissi.com
- 単色の円形ローディング24種。1つずつが独立した動くSVGファイルで、img・CSS背景・直接貼り付けのどれでも動く。ライト版／ダーク版、「動きを減らす」設定対応。
- 【料金】無料 【条件】**利用条件の表示が見つかっていない**（実際に使っている第三者も「明示的なライセンスや規約はない」と記録）。
- 【使い方】作者の許可が取れるまでは見た目の参考にとどめ、`motion-recipes.md` のレシピ15などで自作する。色を変数で変えたいときは、SVGをHTMLに直接貼る方式にする（img読み込みでは外のCSS変数が届かない）。

### #29 Anime.js — animejs.com
- JavaScriptで部品・SVG・数値を動かす定番ライブラリ（GitHubスター約7.3万）。タイムライン、スタッガー（時間差）、スクロール連動、ドラッグ、SVGの線描き、文字分割（splitText）、scrambleText など。
- 【料金】無料 【条件】MIT。ファイルを直接埋め込むときは冒頭の著作権表示を残す。
- 【入れ方】`https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.umd.min.js`（約118KB、グローバル名 `anime`）。最新正式版は4.5.0（2026年6月）、5.0はベータ。
- 【注意】AIは古いv3の書き方を出しがち。v4は `const { animate, createTimeline, stagger } = anime;`、`ease: 'outCubic'`。「動きを減らす」設定は自動で見ないので自分で分岐する（レシピ20）。単発の動きならCSSで十分。
- 【取り出し先】github.com/juliangarnier/anime ／ registry.npmjs.org/animejs

---

## B. React／Tailwind 用の部品集
素のHTMLの成果物（1ファイルのHTML、Claudeのアーティファクトなど）では直接使えません。気に入った演出の「動き方」を読み取り、素のCSS/JSに書き直して使います。ReactとTailwindを使うプロジェクトなら、そのまま導入できます。

### #15 shadcn/ui — ui.shadcn.com
- ボタン・ダイアログ・タブ・フォーム・表などの業務アプリ向け部品の定番（GitHubスター約12.5万）。部品のコードを自分のプロジェクトにコピーして改造する方式。2026年7月から新規プロジェクトの土台は Base UI（Radixも可）。公式MCPあり。
- 【料金】無料 【条件】MIT
- 【向く用途】React＋Tailwindの画面の土台。見た目は落ち着いた業務アプリ風なので、個性は下の演出系部品やトークン設計で足す。
- 【取り出し先】github.com/shadcn-ui/ui（`apps/v4/registry/directory.json` にMagic UI・Aceternity・Motion Primitives などの登録先一覧）

### #17 Magic UI — magicui.design
- 演出付き部品集（Number Ticker＝数字カウントアップ、Border Beam／Shine Border＝縁を光が走る、Meteors＝流れ星、Sparkles Text＝キラキラ文字、Confetti＝紙吹雪、粒子、タイピング文字）。無料部品78個＋使用例170個（宣伝は「150以上」）。
- 【技術】React、Tailwind、Motion（旧Framer Motion）、shadcn互換
- 【料金】無料＋有料Pro（買い切り$199、2026年9月時点） 【条件】無料部品はMIT。Proの条件は未確認。
- 【ヒント】Confetti の中身は canvas-confetti（ISC）なので、素のHTMLでは canvas-confetti を直接読み込めば済む（レシピ19）。
- 【取り出し先】github.com/magicuidesign/magicui（`apps/www/registry.json`）

### #18 Motion Primitives — motion-primitives.com
- 文字・数字の演出に強い小さな部品33種（TextEffect、TextScramble＝暗号風に文字が変わる、TextShimmer、Sliding Number／Animated Number、Glow Effect、Border Trail、Tilt、Morphing Dialog など）。ベータ版。
- 【料金】無料＋有料Pro（価格未確認） 【条件】無料部品はMIT
- 【ヒント】部品が小さくシンプルなので、素のJS/CSSへ書き直しやすい。
- 【取り出し先】github.com/ibelick/motion-primitives（`components/core`）

### #16 Aceternity UI — ui.aceternity.com
- ランディングページ向けの派手な演出（Background Beams＝光のビーム、Meteors、Sparkles、Spotlight、Text Generate Effect＝文字が浮かび上がる、3D Card、Glowing border）。公式には「200以上の部品・ブロック・テンプレート」（有料品を含む数）。
- 【技術】React、Tailwind、Motion。shadcnのコマンドで個別に導入可。
- 【料金】無料部品＋有料 All-Access（買い切り$199・チーム$1,590とみられる。時期により大きく変動）
- 【条件】**独自ライセンス（MITではない）**。完成品（サイト・アプリ）に組み込んで公開・販売するのは可。部品のソースコードそのものの再配布（改造後も）、部品集・テンプレートとしての販売は不可。無料部品だけ別扱いという記載はない。
- 【使い方】コードを移植した成果物を部品集として配ったり、MITなど自由なライセンスで公開したりしない。迷うときは「コードは写さず、動き方を参考に一から書く」。
- 【取り出し先】部品の元コードはGitHubで公開されていない。

### #13 21st.dev — 21st.dev
- 投稿制のReact＋Tailwind（shadcn互換）部品・テーマ・テンプレートの大規模マーケット（1万以上）。MCPで Claude Code・Cursor・VS Code などから検索・取り込みできる。
- 【料金】見る・探すのは無料、コード取得は1日2回まで。Builder（個人）年払い月$6／3か月払い月$8で取得無制限。AIで部品を作るのは Builder＋AI（年払い月$15〜）。（2026年9月時点）
- 【条件】部品の大半はMIT（部品ページに表示。オープンソースから取り込んだものは元のライセンス）。MCPサーバーはISC。
- 【取り出し先】github.com/serafimcloud/docs（公式ドキュメントの元データ）、github.com/21st-dev/magic-mcp

### #22 MicroKit UI — microkit.co
- ボタンのホバー・押下、タブ切り替え、入力欄の動きなど「マイクロインタラクション」49個。TypeScript/JavaScript版、CSS/Tailwind版を選べる。
- 【技術】小さなReact部品＋専用CSS。CSSはほぼそのまま使え、React部分は数行の素のJSに直せる。色（オレンジ）と書体（Arial）が固定なので置き換える。「動きを減らす」対応は49個中21個のみ。
- 【料金】無料 【条件】MIT
- 【取り出し先】github.com/henriquegpb/microkit（`registry.json`）

### #23 Liquid Glass — glass.samasante.com
- Apple風の「液体ガラス」（すりガラス＋背後のゆがみ）を作るReact部品1つと見本5つ。
- 【技術】React必須、SVGフィルター（feDisplacementMap）＋ backdrop-filter、動画向けにWebGL。背後の画面をゆがめられるのは Chrome／Edge のみで、Safari（iPhone含む）・Firefoxではすりガラス止まり。
- 【料金】無料 【条件】MIT
- 【使い方】多くの場合は `motion-recipes.md` のレシピ18（控えめなすりガラス）で十分。
- 【取り出し先】github.com/samasante/liquid-glass

### #20 UIAble — uiable.com
- CodedThemes社のReact用部品集（管理画面・業務向けのフォーム、表、ダイアログ、グラフ。基本部品62、ページ用ブロック60）。
- 【技術】React 19、Next.js 16、Tailwind v4、shadcn方式、Base UI
- 【料金】GitHub版は無料（サイトの有料版の有無は情報が食い違い未確認） 【条件】GitHub版はMIT
- 【取り出し先】github.com/codedthemes/uiable

### #21 mapcn — mapcn.dev
- 実在の地図（OpenStreetMap）を埋め込むReact部品集（地図、マーカー、ポップアップ、経路線、弧線、まとめ表示、GeoJSON、操作ボタン）。MapLibre GL使用。
- 【料金】部品は無料。標準の背景地図（CARTO）を**商用で使うにはCARTOの有料契約が必要**。背景地図はOpenStreetMap、MapTiler、Stadia Mapsなどに切り替え可。
- 【条件】MIT（背景地図・地図データは別途それぞれの条件とクレジット表記が必要）
- 【向く用途】店舗・拠点マップなど実在の地理を扱うときだけ。架空の世界地図には使わない（画像の上に印を置くほうが軽い）。
- 【取り出し先】github.com/AnmolSaini16/mapcn

### #12 VibePrompt — vibeprompts.dev
- Webページ部品（ヒーロー、料金表、機能紹介、ダッシュボード、ログイン、初回案内、FAQ、フッターなど）を作るための英語プロンプト集。286件・15分類で、全件に見本画像とTailwind版HTMLが付く。
- 【料金】無料 【条件】不明
- 【向く用途】細かく指定したプロンプトの書き方の見本。Toast notification、Count-up metrics、Goal progress bars、Welcome tour などは素のCSSに書き直して流用しやすい。
- 【取り出し先】github.com/WBmaker2/vibeprompts-kr（元サイトの韓国語複製。`data/prompts.json`）

---

## C. 画像素材（アイコン・イラスト）

### #28 3dicons — 3dicons.co
- 立体的な3Dアイコン120種×4スタイル（Clay／Gradient／Color／Premium）×3角度＝1,440枚のPNG。Blender元ファイル・Figmaファイル／プラグインあり。
- 【料金】1枚ずつなら無料（まとめてダウンロードはGumroad経由、値段未確認）
- 【条件】**CC0 1.0**（著作権放棄。商用・改変・再配布が自由、クレジット不要）
- 【注意】元画像は大きいので、表示サイズ（64〜128px程度）に縮めてから使う。作者のサーバーに直接リンクしない（作者が通信費を負担）。モチーフは斧・盾・炎・王冠・鍵・お金袋・星・月・稲妻・ハート・ギフト・メダル・トロフィーなど（剣はない）。
- 【取り出し先】github.com/realvjy/3dicons

### #27 Kitbitz — kitbitz.art
- 人の手で描いたイラスト2,000点以上（2,043点）。13キット（Barbieland、City、Cyberpunk、Dungeon、Halloween、Interior、Medieval、Nature、Pirates、Ruins、Space、Western、Winter）。全キットで絵柄・光の向き・縮尺をそろえてあり混ぜて使える。AI生成ではないと明記。SVG／PNG、Figmaキット・プラグイン、公開MCP（mcp.kitbitz.art、認証不要）。
- 【料金】無料（登録不要・上限なし）
- 【条件】**CC0 1.0**（素材のみ。商標・肖像の権利は対象外。サイト・プラグイン・MCP自体は別扱い）
- 【注意】SVGは1点8〜39KB程度で内側の影のフィルターが多い。何十点も埋め込むと重くなるので点数を絞るか、縮めたPNG/WebPにする。
- 【取り出し先】github.com/CaptExcellent/kits-library-assets

---

## D. 見た目の方向性・AIへの指示書

### #4 Refero Styles — styles.refero.design
- 実在ブランド（Apple、Duolingo、ElevenLabsなど）の色・文字・余白・動き・部品の決まりを抜き出し、AIが読める「DESIGN.md」にしたライブラリ（公式「2,000+」）。ブランド名・雰囲気・色・フォントで検索できる。
- 【料金】閲覧・コピーは無料。AIから直接検索するMCPは有料（1席 月$20／年$140〜）
- 【条件】DESIGN.mdの中身の条件は不明。他社ブランドの見た目なので、丸写しせず参考にとどめる。
- 【向く用途】「〇〇っぽい落ち着いた雰囲気で」と言われたときの配色・文字組みの参考。一番の価値は **DESIGN.md という形式そのもの**（`design-tokens-template.md` 参照）。

### #11 DESIGNmd — designmd.ai
- Googleが公開した DESIGN.md 形式（色・文字・余白・部品のルールを1枚にまとめてAIに読ませるファイル）のデザインシステムを、利用者が投稿・共有する無料ライブラリ（100〜数百件）。MCP・CLIあり（無料APIキー）。
- 【条件】CLI・MCPはMIT、形式自体（google-labs-code/design.md）はApache-2.0。投稿物は投稿者がMIT／CC0／CC-BY／CC-BY-SAから選ぶ。実在ブランドをまねたものは避ける。
- 【ヒント】業務サービス向けが多いが、RPG向けの「QuestUI」（金・深い赤・紫の装飾的なファンタジー調）などもある。似た名前の別サイト（designmd.co、designmd.app など）が多いので注意。

### #5 The Component Gallery — component.gallery
- 約95のデザインシステムが同じ部品（約60種）をどう作っているかを並べて比べられるサイト（約2,680例）。
- 【料金】無料 【条件】参考資料（リンク先ごとに条件は別）
- 【向く用途】**部品の正式名と作法を調べる辞書**。Progress bar／Meter（ゲージ）、Toast（短い通知）、Modal（確認画面）、Skeleton（読み込み中の骨組み）、Tabs、Tooltip、Accordion など、正式名で考えると抜けのない設計になり、AIへの指示も正確になる。

### #3 Kage — kage.design
- 実在製品（開発ツール、AI、金融、生産性など）の画面を集め、選んだ画面・部品を Claude Code などのAI用プロンプトに変換してコピーできる（2026年9月11日公開、無料）。
- 【向く用途】業務SaaS風の画面を作るときの参考と、「参考デザインを言葉にしてAIに渡す」書き方の見本。出てきたプロンプトはTailwind/Next.js寄りのことがあるので、技術構成を明記して使う。

### #1 Scrolltide — scrolltide.co
- スクロールに合わせて動く「映画のような」宣伝サイト用のプロンプト＋テンプレート集。3D、GPUで描く背景（炎・オーロラ・液体金属）など。出力は Next.js／React／Tailwind／Framer Motion／GSAP／Three.js 前提。
- 【料金】実質有料（月$29／年$129／生涯$239、いずれもセール価格。3Dは年額以上。無料は1点のみという情報あり）
- 【条件】独自ライセンス。作ったサイトの公開は可、プロンプト自体の再配布は不可。
- 【注意】SNSでは「200以上」と紹介されがちだが、確認できたのは約80〜90件。宣伝目的の紹介が多い。スクロール演出の大がかりなサイトを作る依頼以外では勧めない。

---

## E. 参考ギャラリー（スクショ集）
どれも無料で、載っているのは他社サイトの画面です。デザインや画像をそのまま使うことはできません。**「このギャラリーの〇〇カテゴリのような」と方向性を決める参考**として使います。

| # | 名前 | 中身 | こんなときに |
|---|---|---|---|
| 2 | Minimal Gallery（minimal.gallery） | 2013年から続く、ミニマルな優れたWebサイトの厳選集 | 余白・文字の大小差を上品にしたい |
| 6 | AppShot Gallery（appshot.gallery） | App Storeの宣伝用スクショ集（実画面ではなくストア掲載画像） | スマホ画面の見せ方、宣伝画像を作る |
| 7 | Navbar Gallery（navbar.gallery） | サイト上部メニュー（ドロップダウン、メガメニュー、全画面、サイドバー、スマホ用） | ナビゲーションを作る |
| 8 | Footer（footer.design） | サイト最下部（フッター）だけの画像集 | Webサイトのフッターを作る |
| 9 | CTA Gallery（cta.gallery） | 「登録する」「購入する」などのボタン・フォーム・ポップアップ（ダークモードで絞り込み可）。「コンバージョンテスト済み」の根拠はない | 目立たせるボタンと控えめなボタンの強弱 |
| 10 | 404s（404s.design） | 凝った「ページが見つかりません」画面（ダーク・ゲーム・アニメーションで絞り込み可） | エラー画面・行き止まり画面を楽しくする |
