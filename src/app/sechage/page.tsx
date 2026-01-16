"use client";
import { useState, useEffect } from "react";

export default function SechagePage() {
  const [spools, setSpools] = useState([]);

  useEffect(() => {
    fetch("/api/spools")
      .then(res => res.ok ? res.json() : [])
      .then(data => setSpools(Array.isArray(data) ? data : []));
  }, []);

  // Securite : On ne trie que si spools est un tableau
  const sorted = Array.isArray(spools) ? [...spools].sort((a, b) => {
    const urgencyA = a.isHumid ? 100 : 0;
    const urgencyB = b.isHumid ? 100 : 0;
    return urgencyB - urgencyA;
  }) : [];

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black italic mb-10 tracking-tighter uppercase">Besoin de Sechage</h1>
      <div className="space-y-4">
        {sorted.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-[2rem] border border-white shadow-sm flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl" style={{ backgroundColor: s.colorCode }} />
            <div className="flex-1 font-black uppercase text-xs tracking-widest text-slate-800">
              {s.brand} {s.type} - {s.isHumid ? "Humide" : "Sec"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}