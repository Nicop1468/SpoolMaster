"use client";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function AnalysesPage() {
  const [spools, setSpools] = useState([]);
  useEffect(() => {
    fetch("/api/spools").then(res => res.ok ? res.json() : []).then(data => setSpools(data));
  }, []);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black italic mb-10 tracking-tighter uppercase">Analyses</h1>
      <div className="grid gap-6">
        {spools.map(s => (
          <div key={s.id} className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm">
            <h3 className="font-black text-xl uppercase italic mb-4">{s.brand} {s.type}</h3>
            <div className="space-y-2">
              {s.notes?.map((note, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm font-bold text-slate-600">{note}</p>
                  <button className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}