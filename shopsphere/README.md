# ShopSphere — Phase 1 demo site

A minimal static e-commerce storefront for the MCP learning project. 10 products, 3 categories, homepage / category / product / cart pages, and a working cart backed by `localStorage`.

## Run it locally

No build step, no server required for basic Browse — but **product/category pages read the URL query string**, and some browsers block `fetch`/module behavior on `file://`. This site doesn't use `fetch`, so opening `index.html` directly should work. If anything looks broken, run a tiny local server instead (safer, and closer to how GitHub Pages will serve it):

```bash
cd shopsphere
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new GitHub repo and push this `shopsphere/` folder's contents to it (the files should be at the repo root, or in `/docs` if you prefer).
2. In the repo: **Settings → Pages → Source** → pick the branch (and `/docs` if you used that) → Save.
3. GitHub gives you a URL like `https://yourname.github.io/shopsphere/` within a minute or two.

## What's already wired up (so Phase 3 is easy)

- **`js/site.js`** has a single `trackEvent(name, payload)` function that currently just `console.log`s. Every meaningful action already calls it:
  - `pageView` — fires on every page load
  - `viewCategory` — fires on `category.html`
  - `viewItem` — fires on `product.html`
  - `addToCart` — fires when the Add to Cart button is clicked
  - `purchase` — fires on the (fake) Checkout button in `cart.html`

  In Phase 3, you replace the inside of `trackEvent()` with the real MCP Web SDK call. Nothing else in the codebase needs to change.

- **Zones are already marked** with a dashed `zone-marker` label and a container div, matching the plan:
  - `#zone-homepage-hero` — homepage hero tiles
  - `#homepage-recs` — homepage "Recommended for you"
  - `#zone-pdp-recs` / `#pdp-recs` — product page "You might also like"
  - `#zone-cart-upsell` — cart page upsell banner

  Right now these are filled by simple hardcoded/JS logic (same-category picks, a 30-second timer). In Phase 4–5, you replace that logic with real MCP decisions/campaigns rendering into the same containers.

- **`js/products.js`** is the catalog. It matches the fields MCP's Catalog Object needs (`id, name, category, price, brand, description` — add `imageUrl`/`inStock` if you want to upload this as a real feed later).

## Known simplifications

- Product "images" are CSS pattern blocks with initials, not real photos — keeps the repo dependency-free.
- Checkout is a single button, not a real multi-step flow — good enough to fire a `purchase` event.
- No login/identity — Phase 2 of the full project covers identity resolution once you connect a real email capture or login.
