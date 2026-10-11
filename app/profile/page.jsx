import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRound, Mail, ShieldCheck } from "lucide-react";
export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };
export default async function ProfilePage() {
  let session = null;
  try { session = await auth.api.getSession({ headers: await headers() }); } catch {}
  if (!session?.user) redirect("/signin?protected=1");
  const user = session.user;
  return <section className="container page-section profile-page"><div className="breadcrumb"><Link href="/">হোম</Link><span>/</span><span>আমার প্রোফাইল</span></div><div className="profile-card"><div className="profile-cover"><span>🛒</span><span>বাজার দর সদস্য</span></div><div className="profile-avatar">{user.name?.slice(0,1)?.toUpperCase() || <UserRound/>}</div><div className="profile-info"><span className="section-kicker">MY ACCOUNT</span><h1>{user.name || "ব্যবহারকারী"}</h1><p>আপনার ব্যক্তিগত তথ্য এখানে দেখুন ও আপডেট করুন।</p><div className="profile-detail"><Mail size={17}/><span>{user.email}</span></div><div className="profile-detail"><ShieldCheck size={17}/><span>{user.emailVerified ? "ইমেইল যাচাইকৃত" : "বাজার দর অ্যাকাউন্ট"}</span></div><Link href="/profile/update" className="btn btn-primary btn-large">তথ্য আপডেট করুন ↗</Link></div></div></section>;
}
