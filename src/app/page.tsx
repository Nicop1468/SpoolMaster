"use client";
import { useState, useEffect } from "react";
import SpoolCard from "../components/SpoolCard";

export default function StockPage() {
  const [spools, setSpools] = useState([]);
  const [status, setStatus] = useState("chargement");

  useEffect(() => {
    fetch("/api/spools")
      .then(res => {
        if (res.status === 401) { setStatus("auth_required"); return null; }
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setSpools(data);
          setStatus("ok");
        } else if (data) {
          setStatus("empty");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "auth_required") return <div className="p-20 text-center font-black uppercase">Session expiree. Veuillez vous reconnecter.</div>;
  if (status === "chargement") return <div className="p-20 text-center font-black animate-pulse uppercase">Chargement du stock...</div>;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase mb-10">Mon Stock</h1>
      
      {spools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spools.map((s) => <SpoolCard key={s.id} spool={s} />)}
        </div>
      ) : (
        <div className="p-20 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
          <p className="font-black text-slate-400 uppercase italic">Aucune bobine trouvee</p>
        </div>
      )}
    </main>
  );
}