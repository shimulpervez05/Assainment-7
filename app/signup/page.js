import {Suspense} from 'react';
import AuthForm from '@/components/AuthForm';
export const metadata={title:'সাইন আপ | বাজার দর'};
export default function SignUp(){return <Suspense fallback={<div className="page-loading">লোড হচ্ছে…</div>}><AuthForm mode="signup"/></Suspense>}
