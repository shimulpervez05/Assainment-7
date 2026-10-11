import Link from 'next/link';
import {ArrowLeft,SearchX} from 'lucide-react';
export default function NotFound(){return <section className="wrap not-found"><span className="not-found-icon"><SearchX size={42}/></span><span className="eyebrow">404 • PAGE NOT FOUND</span><h1>দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি</h1><p>লিংকটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।</p><Link className="btn btn-primary" href="/"><ArrowLeft size={16}/> হোম পেজে ফিরে যান</Link></section>}
