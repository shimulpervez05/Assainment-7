'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {authClient} from '@/lib/auth-client';
import toast from 'react-hot-toast';
export default function ProtectedGate({children}){const router=useRouter();const {data:session,isPending}=authClient.useSession();useEffect(()=>{if(!isPending&&!session){toast.error('এই পেজটি দেখতে আগে সাইন ইন করুন');router.replace('/signin?redirect=/product')}} ,[isPending,session,router]);if(isPending)return <div className="wrap page-loading"><div className="spinner"/> আপনার তথ্য যাচাই করা হচ্ছে…</div>;if(!session)return <div className="wrap page-loading">সাইন ইন পেজে নেওয়া হচ্ছে…</div>;return children}
