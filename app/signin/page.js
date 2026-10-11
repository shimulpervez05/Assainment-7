import {Suspense} from 'react';
import AuthForm from '@/components/AuthForm';
export const metadata={title:'সাইন ইন | বাজার দর'};
export default function SignIn(){return <Suspense fallback={<div className="page-loading">লোড হচ্ছে…</div>}><AuthForm mode="signin"/></Suspense>}
