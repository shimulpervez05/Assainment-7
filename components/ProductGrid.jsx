import ProductCard from './ProductCard';
export default function ProductGrid({products=[]}){if(!products.length)return <div className="empty-state"><span>🧺</span><h3>এখনো কোনো পণ্য পাওয়া যায়নি</h3><p>অন্য বিভাগ বেছে নিন অথবা পরে আবার দেখুন।</p></div>;return <div className="product-grid">{products.map((p,i)=><ProductCard key={`${p.id}-${i}`} product={p}/>)}</div>}
