"use client";
import { Star } from "lucide-react";
export default function SpoolCard({ spool }) {
  const isNeverDried = !spool.lastDried;
  const isHumid = spool.isHumid;
  return (
    <div className="bg-white rounded-[2.5rem] border border-white shadow-sm overflow-hidden flex flex-col h-full hover:shadow-xl transition-all">
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 rounded-3xl shadow-inner border-4 border-white" style={{ backgroundColor: spool.colorCode }} />
          <div className="text-right">
            <h3 className="font-black text-slate-900 uppercase italic tracking-tighter text-xl">{spool.brand}</h3>
            <p className="text-slate-400 font-bold text-[10px] uppercase">{spool.type} - {spool.color}</p>
          </div>
        </div>
        <div className="flex justify-center gap-1 mb-6 py-2 bg-slate-50 rounded-2xl">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={14} className={s <= (spool.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
          ))}
        </div>
        <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl">
          <span className="text-[10px] font-black text-slate-400 uppercase">Poids</span>
          <span className="font-black text-slate-700">{spool.weight}g</span>
        </div>
      </div>
      <button className={`w-full py-6 font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isHumid || isNeverDried ? "bg-orange-500 text-white" : "bg-green-100 text-green-600"}`}>
        {isHumid || isNeverDried ? "SECHER (JAMAIS FAIT)" : "SEC (REINITIALISER)"}
      </button>
    </div>
  );
}