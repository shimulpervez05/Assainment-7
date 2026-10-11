"use client";
import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { numeric } from "@/lib/format";
import { ChevronDown, ArrowUpDown } from "lucide-react";
export default function CategoryBrowser({ products }) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "low") list.sort((a,b) => numeric(a.price) - numeric(b.price));
    if (sort === "high") list.sort((a,b) => numeric(b.price) - numeric(a.price));
    return list;
  }, [products, sort]);
  return <><div className="sort-row"><span>{sorted.length}টি পণ্য পাওয়া গেছে</span><label className="sort-control"><ArrowUpDown size={16}/><span>সাজান:</span><select value={sort} onChange={e => setSort(e.target.value)} aria-label="পণ্য সাজান"><option value="default">ডিফল্ট</option><option value="low">দাম: কম থেকে বেশি</option><option value="high">দাম: বেশি থেকে কম</option></select><ChevronDown size={15}/></label></div><ProductGrid products={sorted}/></>;
}
