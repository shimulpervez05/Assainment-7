import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "বাজার দর — প্রতিদিনের বাজারদর এক নজরে",
  description: "চাল, ডাল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর জানুন।"
};
export default function RootLayout({ children }) {
  return <html lang="bn"><body><ToastProvider/><Navbar/><PriceTicker/><main>{children}</main><Footer/></body></html>;
}
