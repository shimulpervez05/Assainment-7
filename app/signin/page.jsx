import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "সাইন ইন — বাজার দর" };
export default function SignInPage() {
  return <Suspense fallback={<div className="container page-section">লোড হচ্ছে...</div>}><AuthForm mode="signin"/></Suspense>;
}
