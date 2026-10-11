'use client';
import Link from 'next/link';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {authClient} from '@/lib/auth-client';
import {UserRound,Mail,ArrowRight,LogOut,ShieldCheck} from 'lucide-react';
import toast from 'react-hot-toast';
export default function Profile(){const router=useRouter();const {data:session,isPending}=authClient.useSession();useEffect(()=>{if(!isPending&&!session){toast.error('প্রোফাইল দেখতে সাইন ইন করুন');router.replace('/signin')}},[isPending,session,router]);const logout=async()=>{await authClient.signOut();toast.success('সাইন আউট সফল হয়েছে');router.push('/')};if(isPending||!session)return <div className="page-loading"><div className="spinner"/> প্রোফাইল লোড হচ্ছে…</div>;return <section className="wrap page-section profile-page"><span className="eyebrow">YOUR ACCOUNT</span><h1>আমার <em>প্রোফাইল</em></h1><p className="page-lead">আপনার ব্যক্তিগত তথ্য দেখুন ও আপডেট করুন।</p><div className="profile-card"><div className="profile-avatar">{session.user.name?.slice(0,1)||<UserRound/>}</div><div className="profile-main"><h2>{session.user.name||'ব্যবহারকারী'}</h2><p><Mail size={16}/>{session.user.email}</p><span className="verified-label"><ShieldCheck size={14}/> বাজার দর সদস্য</span></div><button className="btn btn-outline" onClick={logout}><LogOut size={16}/> সাইন আউট</button></div><div className="profile-settings"><div><h3>ব্যক্তিগত তথ্য</h3><p>আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p></div><Link href="/profile/update" className="btn btn-primary">তথ্য আপডেট করুন <ArrowRight size={16}/></Link></div></section>}
