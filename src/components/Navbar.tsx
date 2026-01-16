"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  const menu = [
    { name: "STOCK", path: "/" },
    { name: "SECHAGE", path: "/sechage" },
    { name: "ANALYSES", path: "/analyses" },
    { name: "SHOPPING", path: "/shopping" }
  ];
  return (
    <nav className="flex justify-center p-6 bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="flex gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200">
        {menu.map((item) => (
          <Link key={item.path} href={item.path} className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${pathname === item.path ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}>{item.name}</Link>
        ))}
      </div>
    </nav>
  );
}