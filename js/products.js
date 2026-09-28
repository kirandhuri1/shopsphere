// ShopSphere product catalog.
// In a real MCP project this is exactly what you'd model as a "Product" Catalog
// Object (id, name, category, price, imageUrl, brand, inStock, description).
const PRODUCTS = [
  { id: "SS-001", name: "Ridgeline Shell Jacket", category: "Outerwear", brand: "ShopSphere", price: 189, sale: false, pattern: "dots", description: "A 3-layer waterproof shell built for exposed ridgelines and long approaches. Fully taped seams, pit zips, helmet-compatible hood." },
  { id: "SS-002", name: "Talus Insulated Vest", category: "Outerwear", brand: "ShopSphere", price: 129, sale: true, pattern: "dots", description: "Synthetic insulation that keeps working wet. Packs down to the size of a water bottle." },
  { id: "SS-003", name: "Basecamp Fleece Pullover", category: "Outerwear", brand: "Northfell", price: 89, sale: false, pattern: "dots", description: "Midweight grid fleece for camp mornings and cold belays alike." },
  { id: "SS-004", name: "Traverse Trail Runners", category: "Footwear", brand: "ShopSphere", price: 139, sale: false, pattern: "stripes", description: "Sticky rubber outsole, rock plate, and a snug midfoot wrap for technical singletrack." },
  { id: "SS-005", name: "Granite Hiking Boot", category: "Footwear", brand: "Northfell", price: 219, sale: true, pattern: "stripes", description: "Full-grain leather boot with a stiff shank for multi-day loads and loose scree." },
  { id: "SS-006", name: "Camp Slide Sandal", category: "Footwear", brand: "ShopSphere", price: 45, sale: false, pattern: "stripes", description: "Let your feet breathe at the end of a long day on trail." },
  { id: "SS-007", name: "Alpine Wool Beanie", category: "Accessories", brand: "ShopSphere", price: 29, sale: false, pattern: "grid", description: "Merino wool, close knit, no itch. One size, most heads." },
  { id: "SS-008", name: "Summit Sunglasses", category: "Accessories", brand: "Northfell", price: 79, sale: false, pattern: "grid", description: "Category 4 lenses for glacier travel and high-altitude glare." },
  { id: "SS-009", name: "Daypack 24L", category: "Accessories", brand: "ShopSphere", price: 99, sale: true, pattern: "grid", description: "A hauler-sized daypack with a hip belt that actually carries weight." },
  { id: "SS-010", name: "Merino Hiking Socks (2-pack)", category: "Accessories", brand: "Northfell", price: 24, sale: false, pattern: "grid", description: "No blisters. No funk. Two pairs so laundry day isn't a crisis." },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter((p) => p.category === category);
}

function getRelatedProducts(product, limit = 4) {
  // Simple placeholder "recommendation" logic: same category, excluding itself.
  // This is exactly the seam you'll rip out in Phase 5 and replace with an
  // MCP Einstein "Similar Items" campaign rendered into #zone-pdp-recs.
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}
