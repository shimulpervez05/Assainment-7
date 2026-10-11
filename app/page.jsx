import Link from "next/link";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import { bnNumber } from "@/lib/format";

export const revalidate = 300;
export default async function HomePage() {
  const products = await getProducts();
  const risers = [...products].filter(p => p.change > 0).sort((a,b) => b.change - a.change).slice(0,6);
  const fallers = [...products].filter(p => p.change < 0).sort((a,b) => a.change - b.change).slice(0,6);
  return <div className="home-page"><Hero/>
    <section className="container market-summary"><div><span className="section-kicker">আজকের বাজার</span><h2>বাজারের ওঠানামা, <span>আপনার নজরে</span></h2><p>আজকের দামের পরিবর্তন বুঝে নিন কেনাকাটার আগেই।</p></div><div className="summary-pills"><span><i className="green-dot"/> দাম বেড়েছে <b>{bnNumber(risers.length)}</b></span><span><i className="red-dot"/> দাম কমেছে <b>{bnNumber(fallers.length)}</b></span></div></section>
    <section className="container section-block"><div className="section-heading"><div><span className="section-kicker">PRICE WATCH</span><h2>আজ দাম বেড়েছে <span className="text-green">▲</span></h2><p>যেসব পণ্যের দাম আজ কিছুটা বেড়েছে</p></div><span className="section-chip rise-chip">দাম ঊর্ধ্বমুখী</span></div>{risers.length ? <ProductGrid products={risers}/> : <ProductGrid products={products.slice(0,Math.min(6,products.length))}/>}</section>
    <section className="container section-block"><div className="section-heading"><div><span className="section-kicker">PRICE WATCH</span><h2>আজ দাম কমেছে <span className="text-red">▼</span></h2><p>দাম কমেছে এমন পণ্যের তালিকা</p></div><span className="section-chip fall-chip">দাম নিম্নমুখী</span></div>{fallers.length ? <ProductGrid products={fallers}/> : <ProductGrid products={products.slice(3,Math.min(9,products.length))}/>}</section>
    <section className="container section-block all-products" id="সব-পণ্য"><div className="section-heading"><div><span className="section-kicker">MARKET DIRECTORY</span><h2>সব পণ্য, <span>এক জায়গায়</span></h2><p>আপনার প্রয়োজনীয় পণ্যের আজকের সম্ভাব্য দাম দেখুন।</p></div><span className="product-count">{bnNumber(products.length)}টি পণ্য</span></div><ProductGrid products={products}/></section>
    <section className="container category-callout"><div><span className="section-kicker">বিভাগ অনুযায়ী দেখুন</span><h2>আপনার বাজারের তালিকা গুছিয়ে নিন</h2><p>পছন্দের বিভাগে গিয়ে দাম তুলনা করুন।</p></div><div className="callout-categories">{[["🍚","চাল","chal"],["🥬","সবজি","sobji"],["🐟","মাছ","mach"],["🫘","ডাল","dal"]].map(([emoji,label,slug])=><Link key={slug} href={`/category/${slug}`} className="callout-category"><span>{emoji}</span>{label}<b>↗</b></Link>)}</div></section>
  </div>;
}
