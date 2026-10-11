import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ChevronDown,ArrowLeft} from 'lucide-react';
import {getProducts,getCategories} from '@/lib/market';
import CategoryProducts from './products-client';
export const revalidate=120;
export async function generateMetadata({params}){const {slug}=await params;const cats=await getCategories();const c=cats.find(x=>x.slug===slug);return {title:`${c?.name||'বিভাগ'} | বাজার দর`}}
export default async function CategoryPage({params}){const {slug}=await params;const [categories,products]=await Promise.all([getCategories(),getProducts(slug)]);const category=categories.find(c=>c.slug===slug||c.id===slug||c.name===slug);if(!category||!products.length)return <section className="wrap not-found"><span>🧺</span><span className="eyebrow">CATEGORY NOT FOUND</span><h1>এই বিভাগটি পাওয়া যায়নি</h1><p>অন্য বিভাগ বেছে নিন অথবা হোম পেজে ফিরে যান।</p><Link className="btn btn-primary" href="/"> <ArrowLeft size={16}/> হোম পেজে ফিরে যান</Link></section>;return <section className="wrap page-section"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>{category.name}</span></div><div className="category-hero"><div className="category-large-icon">{category.icon||'🛍️'}</div><div><span className="eyebrow">CATEGORY MARKET</span><h1>{category.name} <em>বাজারদর</em></h1><p>এই বিভাগের পণ্যগুলোর আজকের দাম এক নজরে দেখুন।</p></div><div className="sort-label"><span>সাজান</span><ChevronDown size={16}/></div></div><CategoryProducts initialProducts={products}/></section>}
