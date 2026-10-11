# বাজার দর — সেটআপ (বাংলা)

এই ZIP-এ `.env` ফাইল আগে থেকেই দেওয়া আছে এবং `DATABASE_URL="file:./dev.db"` সেট করা। তাই `DATABASE_URL` missing error আর হবে না। SQLite ডেটাবেসটি Prisma নিজে তৈরি করবে।

## চালানোর নিয়ম

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

তারপর ব্রাউজারে `http://localhost:3000` খুলুন।

## গুরুত্বপূর্ণ

- `.env` ফাইলটি `package.json`-এর পাশেই আছে।
- SQLite ডেটাবেস তৈরি হবে `prisma/dev.db` ফাইলে।
- Google/GitHub login চালু করতে `.env`-এ OAuth credentials দিতে হবে।
- Vercel-এ deploy করলে SQLite ব্যবহার করবেন না; persistent hosted PostgreSQL ব্যবহার করুন। এজন্য `prisma/schema.prisma` এবং `lib/auth.js`-এ provider `postgresql` করুন এবং Vercel Environment Variables-এ `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` ও `NEXT_PUBLIC_BAZARDOR_API_URL` সেট করুন। বিস্তারিত `README.md`-তে আছে।
