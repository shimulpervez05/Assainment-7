const API_BASES = [
  process.env.BAZARDOR_API_BASE || "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor"
];
const sampleProducts = [
  { id: "1", name: "মিনিকেট চাল", category: "chal", categoryName: "চাল", price: 78, unit: "প্রতি কেজি", change: 2.1, emoji: "🍚", description: "দৈনন্দিন রান্নার জনপ্রিয় চাল" },
  { id: "2", name: "স্বর্ণমাছি চাল", category: "chal", categoryName: "চাল", price: 68, unit: "প্রতি কেজি", change: 1.4, emoji: "🍚", description: "পরিবারের প্রতিদিনের খাবারের জন্য" },
  { id: "3", name: "মসুর ডাল", category: "dal", categoryName: "ডাল", price: 125, unit: "প্রতি কেজি", change: -2.9, emoji: "🫘", description: "প্রোটিনসমৃদ্ধ প্রয়োজনীয় ডাল" },
  { id: "4", name: "আলু", category: "sobji", categoryName: "সবজি", price: 35, unit: "প্রতি কেজি", change: -1.2, emoji: "🥔", description: "প্রতিদিনের রান্নার প্রয়োজনীয় সবজি" },
  { id: "5", name: "পেঁয়াজ", category: "sobji", categoryName: "সবজি", price: 85, unit: "প্রতি কেজি", change: 3.2, emoji: "🧅", description: "রান্নার স্বাদ বাড়াতে প্রয়োজনীয় পণ্য" },
  { id: "6", name: "কাঁচা মরিচ", category: "sobji", categoryName: "সবজি", price: 120, unit: "প্রতি কেজি", change: 5.1, emoji: "🌶️", description: "বাজারে প্রতিদিনের মসলার উপকরণ" },
  { id: "7", name: "সয়াবিন তেল", category: "tel", categoryName: "তেল", price: 170, unit: "প্রতি লিটার", change: 0, emoji: "🫙", description: "রান্নার বহুল ব্যবহৃত ভোজ্যতেল" },
  { id: "8", name: "ডিম", category: "dim", categoryName: "ডিম", price: 145, unit: "প্রতি ডজন", change: -1.8, emoji: "🥚", description: "প্রোটিনের সহজলভ্য উৎস" },
  { id: "9", name: "ইলিশ মাছ", category: "mach", categoryName: "মাছ", price: 850, unit: "প্রতি কেজি", change: 2.7, emoji: "🐟", description: "জনপ্রিয় দেশি মাছের বাজারদর" },
  { id: "10", name: "ব্রয়লার মুরগি", category: "mangsho", categoryName: "মাংস", price: 195, unit: "প্রতি কেজি", change: -0.8, emoji: "🍗", description: "প্রতিদিনের প্রোটিনের একটি উৎস" },
  { id: "11", name: "রসুন", category: "moshla", categoryName: "মসলা", price: 220, unit: "প্রতি কেজি", change: 1.5, emoji: "🧄", description: "রান্নায় বহুল ব্যবহৃত মসলা" },
  { id: "12", name: "আদা", category: "moshla", categoryName: "মসলা", price: 180, unit: "প্রতি কেজি", change: -2.1, emoji: "🫚", description: "রান্না ও পানীয়তে ব্যবহৃত মসলা" }
];
const emojis = { chal: "🍚", rice: "🍚", dal: "🫘", sobji: "🥬", vegetable: "🥬", tel: "🫙", oil: "🫙", mach: "🐟", fish: "🐟", dim: "🥚", egg: "🥚", mangsho: "🍗", meat: "🍗", moshla: "🧄" };
const units = { kg: "প্রতি কেজি", kilogram: "প্রতি কেজি", liter: "প্রতি লিটার", litre: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস" };
function first(obj, keys, fallback) {
  for (const key of keys) if (obj?.[key] !== undefined && obj?.[key] !== null && obj[key] !== "") return obj[key];
  return fallback;
}
function toNumber(value) {
  const map = { "০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9", ",":"", "٬":"" };
  const parsed = Number(String(value ?? 0).replace(/[০-৯,٬]/g, ch => map[ch] ?? ch).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}
function normalize(raw, index = 0) {
  const p = typeof raw === "string" ? { name: raw } : (raw || {});
  
const rawCategory = first(
  p,
  ["categorySlug", "category_slug", "category", "categoryId", "type"],
  "others"
);

const category = String(
  typeof rawCategory === "object"
    ? first(rawCategory, ["slug", "id", "name", "title"], "others")
    : rawCategory
)
  .toLowerCase()
  .replaceAll(" ", "-");

  const price = toNumber(first(p, ["price", "currentPrice", "current_price", "todayPrice", "today_price", "averagePrice", "average_price", "amount"], 0));
  const rawChange = first(p, ["change", "changePercent", "change_percent", "priceChange", "price_change", "percentage"], 0);
  const change = toNumber(String(rawChange).replace("%", ""));
  const id = String(first(p, ["id", "slug", "_id", "productId"], index + 1));
  const name = String(first(p, ["name", "title", "productName", "product_name", "bnName", "banglaName"], `পণ্য ${index + 1}`));
  const unitRaw = String(first(p, ["unit", "unitName", "unit_name", "measurement"], "প্রতি কেজি"));
  const unit = units[unitRaw.toLowerCase()] || unitRaw;
  const categoryName = String(first(p, ["categoryName", "category_name", "categoryTitle"], category === "others" ? "অন্যান্য" : category));
  return { ...p, id, name, slug: String(first(p, ["slug", "id", "_id"], id)), category, categoryName, price, unit, change, emoji: first(p, ["emoji", "icon"], emojis[category] || "🛍️"), description: first(p, ["description", "details", "summary"], `${name} এর আজকের বাজারদর এক নজরে দেখুন।`) };
}
function extractArray(json) {
  if (Array.isArray(json)) return json;
  for (const key of ["products", "data", "items", "results"]) {
    if (Array.isArray(json?.[key])) return json[key];
    if (Array.isArray(json?.data?.[key])) return json.data[key];
  }
  return [];
}
export async function getProducts() {
  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}/products`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const json = await res.json();
      const list = extractArray(json).map(normalize);
      if (list.length) return list;
    } catch {}
  }
  return sampleProducts.map(normalize);
}
export async function getProduct(id) {
  const products = await getProducts();
  const found = products.find(p => p.id === String(id) || p.slug === String(id) || p.name === decodeURIComponent(String(id)));
  if (found) return found;
  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}/products/${encodeURIComponent(id)}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const json = await res.json();
        const raw = json?.product || json?.data || json;
        if (raw && (raw.id || raw.name || raw.title)) return normalize(raw);
      }
    } catch {}
  }
  return null;
}
export async function getCategories() {
  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}/categories`, { next: { revalidate: 600 }, signal: AbortSignal.timeout(4000) });
      if (!res.ok) continue;
      const json = await res.json();
      const list = extractArray(json).map((c, i) => typeof c === "string" ? { slug: c, name: c, emoji: "🛍️" } : ({ slug: String(first(c, ["slug", "id", "key"], i)), name: String(first(c, ["name", "title", "label"], "বিভাগ")), emoji: first(c, ["emoji", "icon"], "🛍️") }));
      if (list.length) return list;
    } catch {}
  }
  return [
    { slug: "chal", name: "চাল", emoji: "🍚" }, { slug: "dal", name: "ডাল", emoji: "🫘" },
    { slug: "sobji", name: "সবজি", emoji: "🥬" }, { slug: "tel", name: "তেল", emoji: "🫙" },
    { slug: "mach", name: "মাছ", emoji: "🐟" }, { slug: "dim", name: "ডিম", emoji: "🥚" },
    { slug: "mangsho", name: "মাংস", emoji: "🍗" }, { slug: "moshla", name: "মসলা", emoji: "🧄" }
  ];
}
export { normalize };
