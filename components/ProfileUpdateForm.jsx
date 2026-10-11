"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function ProfileUpdateForm({ initialName }) {
  const [name,setName] = useState(initialName || "");
  const [busy,setBusy] = useState(false);
  const router = useRouter();
  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখুন");
    setBusy(true);
    try {
      const result = await authClient.updateUser({ name: name.trim() });
      if (result.error) throw new Error(result.error.message || "তথ্য আপডেট হয়নি");
      toast.success("প্রোফাইলের তথ্য আপডেট হয়েছে");
      router.push("/profile"); router.refresh();
    } catch (err) { toast.error(err.message || "আপডেট করা যায়নি"); }
    finally { setBusy(false); }
  }
  return <form className="profile-update-form" onSubmit={submit}><label htmlFor="profile-name">আপনার নাম</label><input id="profile-name" value={name} onChange={e=>setName(e.target.value)} maxLength={80} required/><p>এই নামটি আপনার প্রোফাইলে প্রদর্শিত হবে।</p><button className="btn btn-primary btn-large" disabled={busy}>{busy?"আপডেট হচ্ছে...":"তথ্য আপডেট করুন"} ↗</button></form>;
}
