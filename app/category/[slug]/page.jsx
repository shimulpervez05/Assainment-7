import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryBrowser from "@/components/CategoryBrowser";
import { getCategories, getProducts } from "@/lib/products";
export const revalidate = 300;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find(c => c.slug === slug);
  return { title: `${cat?.name || "বিভাগ"} — বাজার দর` };
}
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [categories, allProducts] = await Promise.all([getCategories(), getProducts()]);
  const category = categories.find(c => c.slug.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === slug.toLowerCase());
  const products = allProducts.filter(p => p.category.toLowerCase() === slug.toLowerCase() || p.categoryName.toLowerCase() === slug.toLowerCase() || p.category.toLowerCase() === category?.name?.toLowerCase());
  if (!category && !products.length) notFound();
  const title = category?.name || products[0]?.categoryName || slug;
  const emoji = category?.emoji || products[0]?.emoji || "🛍️";
  return <section className="container page-section category-page"><div className="breadcrumb"><Link href="/">হোম</Link><span>/</span><span>{title}</span></div><div className="category-hero"><div className="category-icon">{emoji}</div><div><span className="section-kicker">PRODUCT CATEGORY</span><h1>{title} <span>বাজারদর</span></h1><p>এই বিভাগের পণ্যের বর্তমান দাম দেখুন এবং তুলনা করুন।</p></div></div><CategoryBrowser products={products}/></section>;
}
