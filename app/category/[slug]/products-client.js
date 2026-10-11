'use client';
import {useMemo,useState} from 'react';
import {ChevronDown} from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
export default function CategoryProducts({initialProducts}){const [sort,setSort]=useState('default');const products=useMemo(()=>{const list=[...initialProducts];if(sort==='asc')list.sort((a,b)=>Number(a.price)-Number(b.price));if(sort==='desc')list.sort((a,b)=>Number(b.price)-Number(a.price));return list},[initialProducts,sort]);return <><div className="sort-toolbar"><span>{products.length.toLocaleString('bn-BD')} টি পণ্য পাওয়া গেছে</span><label className="sort-select"><span>সাজান:</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select><ChevronDown size={15}/></label></div><ProductGrid products={products}/></>}
