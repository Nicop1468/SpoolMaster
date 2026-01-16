"use client";
import { useState, useEffect } from "react";
import SpoolCard from "../components/SpoolCard";

export default function StockPage() {
  const [spools, setSpools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Tentative de recuperation des donnees...");
    fetch("/api/spools")
      .then(res => {
        if (!res.ok) throw new Error("Erreur serveur: " + res.status);
        return res.json();
      })
      .then(data => setSpools(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Erreur API:", err);
        setError(err.message);
      });
  }, []);

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
         <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase">Mon Stock</h1>
         <div className="bg-blue-500 text-white inline-block px-4 py-1 rounded-full text-[10px] font-bold mt-2">
            DEBUG: {spools.length} bobines trouvees
         </div>
         {error && <p className="text-red-500 font-bold mt-2">Erreur: {error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spools.length > 0 ? (
          spools.map((s) => <SpoolCard key={s.id} spool={s} />)
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-black uppercase">Aucune donnee a afficher</p>
          </div>
        )}
      </div>
    </main>
  );
}