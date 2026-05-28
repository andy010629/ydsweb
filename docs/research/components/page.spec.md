# Vapeland Taiwan — Single Page Spec

Target site is a single-scroll landing page on Wix. Page is ~1610px tall at desktop 1440 — small enough for one consolidated spec.

## Page Topology (top → bottom)
1. **Header** — light cream/eggshell bg, centered logo, horizontal nav row, search input on right
2. **AnnouncementBanner** — warm yellow stripe, black text with red highlights
3. **HeroCarousel** — dark grainy texture bg, centered product slideshow (~960×560), prev/next arrows, dot pagination (9 dots)
4. **WelcomeBlock** — dark grainy texture bg continues, big "煙島台灣" title + welcome paragraph + English subtitle
5. **StoreLookup** — dark grainy bg, FamilyMart + 7-ELEVEN circle logos side by side, each with two white pill buttons below ("門市查詢" / "貨態查詢")
6. **Footer** — pure black bg, centered LINE QR code, CTA text, copyright
7. **FloatingSocial** — fixed right side mid-page, stacked LINE + Instagram square buttons

## Design Tokens

### Colors
- `--bg-page` dark grainy: rgb(38,38,38) approx with grainy noise texture image overlay (`/images/bg-texture.jpg`)
- `--bg-header`: rgb(245, 244, 236) light cream
- `--bg-banner`: rgb(243, 211, 107) warm yellow
- `--bg-footer`: rgb(0, 0, 0)
- `--text-cream`: rgb(243, 240, 228) — used for welcome title
- `--text-cream-muted`: rgb(193, 191, 182) — qr caption, secondary
- `--text-banner`: rgb(0, 0, 0)
- `--text-banner-accent`: rgb(213, 41, 65) red — "1500元" and "煙島桑LINE好友"
- `--nav-active`: rgb(228, 105, 76) orange-red — currently active nav link
- `--nav-link`: rgb(0, 0, 0)

### Typography
- Font: Noto Sans TC (regular 400 / medium 500 / semibold 600 / bold 700) from Google
- Nav links: 16px / 28.64px line-height / 400
- Welcome H1: 40px / 600, cream color
- Welcome body lines: 16px / cream
- Banner: 14px / 400 / black, with red bold for amount + LINE
- QR caption: 15px / cream-muted
- Copyright: 13px / cream-muted

### Spacing & Layout
- Page max-width: 1200px content within full-bleed sections
- Section vertical padding: ~64px each
- Header height: ~100px nav row + 40px banner = ~140px stacked

## DOM Structure

```
<header class="header">
  <img logo />
  <nav>
    <a active>煙島台灣</a> <a>小煙主機</a> ... 8 links total
  </nav>
  <input search placeholder="搜尋..." />
</header>

<div class="banner">
  凡消費滿<span red>1500元</span>即可享免運 | 下單請加<span red>煙島桑LINE好友</span>詢問客服
</div>

<section class="hero">
  <button prev /> <img active-slide /> <button next />
  <nav class="dots"> li × 9 </nav>
</section>

<section class="welcome">
  <h1>煙島台灣</h1>
  <p>歡迎光臨 【煙島台灣】</p>
  <p>我是煙島桑</p>
  <p>這裡是電子煙專賣店</p>
  <p class="bold">加熱煙、電子煙、大小煙油、拋棄式煙彈</p>
  <p class="bold">LINE 24小時在線客服</p>
  <p>有任何需要服務的地方 請加入我們的LINE</p>
  <p>隨時歡迎您的諮詢</p>
  <p>WELCOME TO VAPELAND TAIWAN</p>
</section>

<section class="stores">
  <div>
    <img familymart-logo />  <img 7eleven-logo />
  </div>
  <div pills>
    <a>全家 門市查詢</a>  <a>7-11 門市查詢</a>
  </div>
  <div pills>
    <a>貨態查詢</a>  <a>貨態查詢</a>
  </div>
</section>

<footer>
  <img qr />
  <p>立即加入LINE好友與我們聯繫!</p>
  <p>手機版可直接點擊QR code加入好友(▀ ̿Ĺ̯▀ ̿)</p>
  <p>©2026 by 煙島台灣.</p>
</footer>

<aside class="floating-social">
  <a line-icon />
  <a ig-icon />
</aside>
```

## Behaviors
- Header: static (no scroll change observed on this Wix site)
- Carousel: auto-advances every ~5s; clicking dots/arrows jumps. Implement as React state cycling 0..8.
- Pill buttons: hover state — bg goes light gray (~rgb(240,240,240))
- Floating social: position: fixed; right: 0; top: 50%; transform: translateY(-50%)

## Assets (downloaded to /public/images/)
- `logo.png` (130×70)
- `arrow-left.png`, `arrow-right.png` (43×40)
- `icon-line.png`, `icon-ig.png` (45×45)
- `slide-alien.jpg` (559×410) — only slide we have full-res for
- `logo-familymart.png`, `logo-711.png` (136×136)
- `qr-line.png` (LINEME QR)
- `bg-texture.jpg` (1920×1280 dark grainy paper)
- `favicon.png`

## Responsive
- Below 768px: nav collapses to hamburger (not built — defer)
- Stores section stacks vertically below 640px

## Out of scope
- 9-slide carousel content: only slide 1 captured. Display alien slide repeated or use solid bg with brand text on remaining slides.
- Live store lookup URLs / shipment tracking — links go to "#"
- Wix's mobile hamburger menu
