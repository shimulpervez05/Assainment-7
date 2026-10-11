import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct, getProducts } from "@/lib/products";
import { bnNumber } from "@/lib/format";
export const revalidate = 120;
export default async function ProductPage({ params }) {
  const { slug } = await params;
  let session = null;
  try { session = await auth.api.getSession({ headers: await headers() }); } catch {}
  if (!session?.user) redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}&protected=1`);
  const product = await getProduct(slug);
  if (!product) notFound();
  const all = await getProducts();
  const peers = all.filter(p => p.category === product.category);
  const prices = peers.map(p => p.price).filter(Number.isFinite);
  const min = prices.length ? Math.min(...prices) : product.price;
  const max = prices.length ? Math.max(...prices) : product.price;
  const avg = prices.length ? prices.reduce((a,b)=>a+b,0)/prices.length : product.price;
  const markets = [
    ["কারওয়ান বাজার, ঢাকা", product.price * 0.97, "সকাল ৮:৩০"],
    ["মোহাম্মদপুর কৃষি মার্কেট", product.price, "সকাল ৯:১৫"],
    ["নিউ মার্কেট, ঢাকা", product.price * 1.04, "সকাল ১০:০০"]
  ];
  return <section className="container page-section detail-page"><div className="breadcrumb"><Link href="/">হোম</Link><span>/</span><Link href={`/category/${product.category}`}>{product.categoryName}</Link><span>/</span><span>{product.name}</span></div>
    <div className="detail-top"><div className="detail-art">{product.emoji}</div><div className="detail-copy"><span className="section-kicker">PRODUCT MARKET SUMMARY</span><h1>{product.name}</h1><p>{product.description}</p><div className="tag-row"><span>{product.categoryName}</span><span>{product.unit}</span><span className={`change-badge ${product.change > 0 ? "change-up" : product.change < 0 ? "change-down" : "change-flat"}`}>{product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"} {bnNumber(Math.abs(product.change))}%</span></div><div className="detail-price"><small>আজকের সম্ভাব্য দাম</small><strong>{bnNumber(product.price)} <span>টাকা</span></strong></div></div></div>
    <div className="section-heading detail-heading"><div><span className="section-kicker">PRICE OVERVIEW</span><h2>দামের সারসংক্ষেপ</h2><p>এই বিভাগের পণ্যের দামের ভিত্তিতে আনুমানিক তুলনা</p></div></div>
    <div className="price-stat-grid"><div className="price-stat"><span>সর্বনিম্ন দাম</span><strong>{bnNumber(min)} <small>টাকা</small></strong><em>▼ কম দামের সীমা</em></div><div className="price-stat featured"><span>গড় দাম</span><strong>{bnNumber(avg)} <small>টাকা</small></strong><em>◉ গড় বাজারদর</em></div><div className="price-stat"><span>সর্বোচ্চ দাম</span><strong>{bnNumber(max)} <small>টাকা</small></strong><em>▲ বেশি দামের সীমা</em></div></div>
    <div className="section-heading market-heading"><div><span className="section-kicker">LOCAL MARKET CHECK</span><h2>বাজারভিত্তিক আজকের দাম</h2><p>নিচের দামগুলো সম্ভাব্য উদাহরণ; কেনার আগে স্থানীয় বাজারে যাচাই করুন।</p></div></div>
    <div className="market-table-wrap"><table className="market-table"><thead><tr><th>বাজার</th><th>আজকের দাম</th><th>পর্যবেক্ষণের সময়</th><th>অবস্থা</th></tr></thead><tbody>{markets.map(([name, price, time],i)=><tr key={name}><td><span className="market-pin">⌖</span><strong>{name}</strong></td><td><b>{bnNumber(price)} টাকা</b></td><td>{time}</td><td><span className="market-status">{i===1?"গড় দাম":"সম্ভাব্য"}</span></td></tr>)}</tbody></table></div>
    <div className="disclaimer">ⓘ বাজারদর অঞ্চল, পণ্যের মান ও সময়ভেদে পরিবর্তিত হতে পারে। এই তথ্য কেনাকাটার সিদ্ধান্তে সহায়ক ধারণা হিসেবে ব্যবহার করুন।</div>
  </section>;
}
