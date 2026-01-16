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
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-20 text-center font-black animate-pulse uppercase tracking-widest text-slate-400">Recherche des bobines...</div>;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
           <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase">Mon Stock</h1>
           <p className="text-slate-400 font-bold ml-1 uppercase text-xs tracking-widest">Inventaire des filaments</p>
        </div>
      </div>

      {spools.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
          <p className="text-slate-400 font-black uppercase italic">Aucune bobine trouvee en base de donnees</p>
          <button className="mt-4 bg-slate-900 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            Ajouter ma premiere bobine
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spools.map((s) => (
            <SpoolCard key={s.id} spool={s} />
          ))}
        </div>
      )}
    </main>
  );
}