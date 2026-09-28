/* ShopSphere — shared site logic.
 *
 * trackEvent() below is a deliberate stub. In Phase 3 of the MCP project,
 * this is the ONE function you rewire to call the MCP Web SDK instead of
 * console.log — every call site (viewItem, viewCategory, addToCart, purchase)
 * stays exactly the same. That's the point: instrument your site against a
 * clean event contract first, wire the vendor SDK in second.
 */
function trackEvent(eventName, payload) {
  // TODO (Phase 3): replace this with the real MCP Web SDK call, e.g.
  //   _sml.push(['event', eventName, payload]);
  // or the unified SDK's evergage.sendEvent(...) — check your SDK version's docs.
  console.log("[trackEvent]", eventName, payload);
}

const CART_KEY = "shopsphere_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((line) => line.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }
  saveCart(cart);

  const product = getProductById(productId);
  trackEvent("addToCart", {
    productId,
    qty,
    price: product ? product.price : null,
    category: product ? product.category : null,
  });
}

function removeFromCart(productId) {
  const cart = getCart().filter((line) => line.productId !== productId);
  saveCart(cart);
}

function setQty(productId, qty) {
  const cart = getCart();
  const line = cart.find((l) => l.productId === productId);
  if (!line) return;
  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }
  line.qty = qty;
  saveCart(cart);
}

function cartTotal() {
  return getCart().reduce((sum, line) => {
    const p = getProductById(line.productId);
    return sum + (p ? p.price * line.qty : 0);
  }, 0);
}

function cartCount() {
  return getCart().reduce((sum, line) => sum + line.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-badge]").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

function money(n) {
  return "$" + n.toFixed(2);
}

function patternClass(pattern) {
  return "swatch swatch--" + pattern;
}

// Builds the little placeholder "image" block used everywhere instead of a photo.
function productSwatch(product) {
  const initials = product.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    '<div class="' +
    patternClass(product.pattern) +
    '"><span>' +
    initials +
    "</span></div>"
  );
}

function productCard(product) {
  return `
    <a class="card" href="product.html?id=${product.id}">
      ${productSwatch(product)}
      <div class="card__body">
        <p class="card__brand">${product.brand}</p>
        <h3 class="card__name">${product.name}</h3>
        <p class="card__price">${product.sale ? '<span class="tag">Sale</span> ' : ""}${money(product.price)}</p>
      </div>
    </a>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  trackEvent("pageView", { path: window.location.pathname + window.location.search });
});
