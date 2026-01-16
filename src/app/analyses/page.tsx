"use client";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function AnalysesPage() {
  const [spools, setSpools] = useState([]);

  useEffect(() => {
    fetch("/api/spools").then(res => res.json()).then(data => setSpools(Array.isArray(data) ? data : []));
  }, []);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black italic mb-10 tracking-tighter uppercase">Analyses par Bobine</h1>
      <div className="grid gap-6">
        {spools.map(s => (
          <div key={s.id} className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-10 h-10 rounded-xl" style={{ backgroundColor: s.colorCode }} />
               <h3 className="font-black text-xl uppercase italic">{s.brand} {s.type}</h3>
            </div>
            
            <div className="space-y-3">
              {s.notes && s.notes.length > 0 ? (
                s.notes.map((note, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl group">
                    <p className="text-slate-600 font-medium">{note}</p>
                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-slate-300 italic text-sm">Aucune note pour cette bobine</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}