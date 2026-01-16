"use client";
import { useState, useEffect } from "react";
import SpoolCard from "../components/SpoolCard";

export default function StockPage() {
  const [spools, setSpools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/spools")
      .then(res => res.json())
      .then(data => {
        setSpools(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center font-black animate-pulse uppercase">Chargement du stock...</div>;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
           <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase">Mon Stock</h1>
           <p className="text-slate-400 font-bold ml-1 uppercase text-xs tracking-widest">Inventaire des filaments</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-white">
           <p className="text-[10px] font-black text-slate-400 uppercase">Total</p>
           <p className="text-2xl font-black text-slate-800">{spools.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spools.map((s) => (
          <SpoolCard key={s.id} spool={s} />
        ))}
      </div>
    </main>
  );
}