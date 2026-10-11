import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
export const metadata = { title: "তথ্য আপডেট — বাজার দর" };
export default async function UpdateProfilePage() {
  let session = null;
  try { session = await auth.api.getSession({ headers: await headers() }); } catch {}
  if (!session?.user) redirect("/signin?protected=1");
  return <section className="container page-section update-page"><div className="breadcrumb"><Link href="/">হোম</Link><span>/</span><Link href="/profile">আমার প্রোফাইল</Link><span>/</span><span>তথ্য আপডেট</span></div><div className="update-card"><div className="update-icon">✎</div><span className="section-kicker">ACCOUNT SETTINGS</span><h1>আপনার তথ্য আপডেট করুন</h1><p>আপনার প্রোফাইলের নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।</p><ProfileUpdateForm initialName={session.user.name}/></div></section>;
}
