"use client";
import { useState, useEffect } from "react";

export default function SechagePage() {
  const [spools, setSpools] = useState([]);
  useEffect(() => {
    fetch("/api/spools").then(res => res.ok ? res.json() : []).then(data => setSpools(data));
  }, []);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black italic mb-10 tracking-tighter uppercase">Etat de Sechage</h1>
      <div className="grid gap-4">
        {spools.map(s => (
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