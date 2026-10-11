import Image from "next/image";
export default function Hero() {
  return <section className="hero container">
    <div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> প্রতিদিনের বাজার, এক জায়গায়</div>
      <h1>বাজারের সঠিক দাম,<br/><span>সিদ্ধান্ত হোক সহজ।</span></h1>
      <p>চাল, ডাল, সবজি থেকে মাছ-মাংস—প্রয়োজনীয় পণ্যের আজকের বাজারদর জানুন এক নজরে। বাজারে যাওয়ার আগে থাকুন আপডেটেড।</p>
      <div className="hero-actions"><a className="btn btn-primary btn-large" href="#সব-পণ্য">সব পণ্যের দাম দেখুন <span>↘</span></a><div className="hero-trust"><span className="trust-avatars">✓</span><span><strong>সহজ, স্বচ্ছ, নির্ভরযোগ্য</strong><small>আপনার প্রতিদিনের বাজার সহযোগী</small></span></div></div>
      <div className="hero-stats"><div><strong>০১</strong><span>এক নজরে বাজারদর</span></div><div><strong>২৪/৭</strong><span>যেকোনো সময় দেখুন</span></div><div><strong>বাংলা</strong><span>সহজ ভাষায় তথ্য</span></div></div>
    </div>
    <div className="hero-visual"><div className="hero-blob"/><Image className="hero-image" src="/bazar-hero.png" alt="তাজা বাজারের পণ্য" width={560} height={470} priority/><div className="floating-note note-top"><span>🥬</span><div><small>তাজা বাজারের তথ্য</small><b>প্রতিদিন আপডেট</b></div></div><div className="floating-note note-bottom"><span>📊</span><div><small>দাম তুলনা করুন</small><b>কেনাকাটা হোক স্মার্ট</b></div></div></div>
  </section>;
}
