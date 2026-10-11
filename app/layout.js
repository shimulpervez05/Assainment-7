import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import PriceTicker from '@/components/PriceTicker';
import {getProducts} from '@/lib/market';
export const metadata={title:'বাজার দর | প্রতিদিনের বাজারদর',description:'নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর এক নজরে দেখুন।'};
export default async function RootLayout({children}){let products=[];try{products=await getProducts()}catch{}return <html lang="bn"><body><Providers><Navbar/><div className="ticker-space"><PriceTicker products={products}/></div><main>{children}</main><Footer/></Providers></body></html>}
