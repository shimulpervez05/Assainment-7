import Link from "next/link";
export default function NotFound() {
  return <section className="not-found container"><div className="not-found-emoji">🧺</div><span className="section-kicker">404 — PAGE NOT FOUND</span><h1>ওহ! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1><p>আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল।</p><Link className="btn btn-primary btn-large" href="/">হোম পেজে ফিরে যান ↗</Link></section>;
}
