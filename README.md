# 🛍️ Nebula — Premium Multi-Category Ecommerce Homepage

A pixel-perfect, modern, and conversion-focused ecommerce homepage built with pure **HTML**, **CSS**, and **JavaScript**. Inspired by Apple aesthetics and Shopify Plus themes.

---

## 🌐 Live Preview

> Open `index.html` directly in your browser — **no build tools or server required.**

---

## ✨ Features

- 🎠 **Auto-Advancing Hero Slider** — 3 content panels with smooth crossfade and dot navigation
- 🗂️ **Browse by Categories** — Swiper-powered horizontal scroll carousel (Fashion, Electronics, Beauty, Home, Sports, Books, Toys, Automotive)
- 🛒 **Trending Products Grid** — 6 product cards with wishlist toggle, add-to-cart button, and star ratings
- 🏷️ **Promo Banners** — Two full-width campaign banners with custom generated imagery
- 🖼️ **New Arrivals Grid** — 4 product showcase cards
- 🎁 **Benefits Bar** — Free Shipping · Secure Payment · Easy Returns · 24/7 Support
- 📬 **Newsletter Signup** — Styled email subscription form
- 🦶 **Footer** — Brand info, quick links, contact details, and social icons
- 📱 **Fully Responsive** — Mobile-first breakpoints at 768px and 576px
- 🌙 **Premium Design** — Dark navy + cream palette, soft shadows, glassmorphism cards
- 🔔 **Toast Notifications** — Cart & wishlist feedback with smooth slide-up animation
- ♿ **Accessible** — Semantic HTML5, ARIA labels, keyboard-navigable

---

## 🗂️ Project Structure

```
Shopping website-Frontend/
│
├── index.html          # Main HTML — all sections and semantic markup
├── styles.css          # Full design system — variables, grid, components, animations
├── script.js           # Interactions — hero slider, cart, wishlist, toasts, scroll effects
│
└── assets/
    ├── hero_lifestyle.png    # Hero section model image (AI-generated)
    ├── promo_summer.png      # Summer Sale banner image (AI-generated)
    └── promo_fresh.png       # Fresh Finds banner image (AI-generated)
```

---

## 🚀 Getting Started

### Option 1 — Open directly (simplest)
```bash
# Clone the repo
git clone https://github.com/RaunakRaj567/shopping-website.git

# Open in browser
cd shopping-website
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

### Option 2 — Live Server (recommended for development)
If you have VS Code installed:
1. Install the **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Navy | `#082540` |
| Secondary Navy | `#12385D` |
| Background | `#F7F8FA` |
| Card | `#FFFFFF` |
| Accent Beige | `#F6E4D3` |
| Button | `#F2D4BA` |
| Star Rating | `#FDBB2D` |
| Success | `#34C759` |
| Font | **Inter** (Google Fonts) |

---

## 📦 Dependencies (CDN — no install needed)

| Library | Purpose |
|---|---|
| [Swiper.js v11](https://swiperjs.com/) | Category carousel |
| [Lucide Icons](https://lucide.dev/) | UI icon set |
| [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) | Typography |

> All external dependencies are loaded via CDN. **No npm install required.**

---

## 📸 Images

| Image | Source |
|---|---|
| `hero_lifestyle.png` | AI-generated, bundled in `/assets` |
| `promo_summer.png` | AI-generated, bundled in `/assets` |
| `promo_fresh.png` | AI-generated, bundled in `/assets` |
| Product & Category images | [Unsplash](https://unsplash.com) CDN (requires internet) |

> ✅ The three hero/promo images are **included in the repository** and will display correctly offline.  
> 🌐 Product images require an internet connection as they load from Unsplash CDN.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 1024px` | Full desktop — sidebar + hero side-by-side |
| `768px – 1024px` | Tablet — hero stacks vertically |
| `< 768px` | Mobile — single column, hamburger drawer nav |
| `< 576px` | Small mobile — compact spacing and font sizes |

---

## 🛠️ Customisation

- **Colors** → Edit CSS variables in the `:root` block at the top of `styles.css`
- **Products** → Update the product cards in `index.html` (search for `<!-- Product`)
- **Hero Slides** → Edit `.hero-panel` divs in `index.html`
- **Support Number** → Search for `tel:` in `index.html`
- **Pricing** → Search for `product-price` class in `index.html`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ using vanilla HTML, CSS & JavaScript — no frameworks, no build steps.
