"use client";
import { useState, useEffect } from "react";

export default function SechagePage() {
  const [spools, setSpools] = useState([]);

  useEffect(() => {
    fetch("/api/spools").then(res => res.json()).then(data => setSpools(Array.isArray(data) ? data : []));
  }, []);

  const getUrgency = (s) => {
    if (s.isHumid) return 100;
    if (!s.lastDried) return 95;
    const diff = Math.ceil(Math.abs(new Date().getTime() - new Date(s.lastDried).getTime()) / (1000 * 3600 * 24));
    return Math.min(diff * 3, 90);
  };

  const sorted = [...spools].sort((a, b) => getUrgency(b) - getUrgency(a));

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black italic mb-2 tracking-tighter uppercase">Etat de Sechage</h1>
      <p className="text-slate-400 font-bold mb-10 uppercase text-xs">Priorites de conditionnement</p>
      
      <div className="space-y-4">
        {sorted.map((s) => {
          const urgency = getUrgency(s);
          return (
            <div key={s.id} className="bg-white p-6 rounded-[2.5rem] border border-white shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl shadow-inner border-2 border-slate-50" style={{ backgroundColor: s.colorCode }} />
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-black text-sm text-slate-800 uppercase italic">{s.brand} {s.type}</span>
                  <span className={`font-black text-[10px] uppercase ${urgency > 80 ? 'text-orange-500' : 'text-blue-500'}`}>
                    {urgency > 80 ? 'Urgent' : 'Correct'} ({Math.round(urgency)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                  <div className={`h-full rounded-full transition-all ${urgency > 80 ? 'bg-orange-500' : 'bg-blue-500'}`} style={{ width: `${urgency}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}