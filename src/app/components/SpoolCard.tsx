"use client";
import { useState } from 'react';

export default function SpoolCard({ spool, onConsume, onDelete, fetchData }: any) {
  const [useAmount, setUseAmount] = useState(50);
  const [nozzle, setNozzle] = useState(spool.nozzleTemp || 200);
  const [bed, setBed] = useState(spool.bedTemp || 60);
  const [rating, setRating] = useState(spool.rating || 0);
  const [note, setNote] = useState(spool.note || "");
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const lastDriedStr = spool.lastDried;
  const daysSinceDried = lastDriedStr 
    ? Math.floor((new Date().getTime() - new Date(lastDriedStr).getTime()) / (1000 * 60 * 60 * 24))
    : 9999;

  const thresholds: any = { 'Air Libre': 30, 'Boite Hermetique': 90, 'Sous Vide': 365 };
  const limit = thresholds[spool.storage || 'Air Libre'] || 30;
  const isHumid = daysSinceDried > limit;

  const isSilk = spool.type?.toLowerCase().includes('silk') || spool.type?.toLowerCase().includes('soie');

  const saveTemps = async () => {
    await fetch('/api/spools', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: spool.id, action: 'update_temps', nozzleTemp: Number(nozzle), bedTemp: Number(bed) })
    });
  };

  const saveDetails = async (newRating: number, newNote: string) => {
    setRating(newRating);
    setNote(newNote);
    await fetch('/api/spools', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: spool.id, action: 'update_details', rating: newRating, note: newNote })
    });
  };

  const handleDry = async () => {
    await fetch('/api/spools', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: spool.id, 
        action: 'update_maintenance', 
        lastDried: new Date().toISOString(), 
        storage: spool.storage || "Air Libre" 
      })
    });
    if (fetchData) fetchData();
  };

  const updateStorage = async (newStorage: string) => {
    await fetch('/api/spools', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: spool.id, 
        action: 'update_maintenance', 
        lastDried: spool.lastDried, 
        storage: newStorage 
      })
    });
    if (fetchData) fetchData();
  };

  return (
    <>
      <div className={`group bg-white rounded-[2.5rem] p-6 shadow-sm border relative flex flex-col text-left transition-all hover:shadow-xl ${isHumid ? 'border-orange-200 ring-1 ring-orange-100' : 'border-slate-100'}`}>
        
        {/* ID Badge */}
        <div className="absolute -top-3 -left-3 bg-slate-900 text-white text-[10px] font-black w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#F8FAFC] z-20">
          #{String(spool.id).padStart(3, '0')}
        </div>
        
        {/* Delete Button */}
        <button onClick={() => { if(confirm('Supprimer ?')) onDelete(spool.id) }} className="absolute -top-3 -right-3 w-10 h-10 bg-white text-slate-300 hover:text-red-500 rounded-full flex items-center justify-center shadow-sm border-4 border-[#F8FAFC] z-20 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
        </button>

        <div className="flex justify-between items-start mb-2 pt-2">
          <div className="text-left w-full mr-4">
            <h3 className="font-black text-xl tracking-tighter text-slate-900 leading-tight mb-1">{spool.brand}</h3>
            <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">{spool.type}</span>
            
            <div className="flex gap-3 mb-2">
              <div className="flex items-center gap-2 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                 <span className="text-[9px] font-black text-slate-400">NOZ</span>
                 <input type="number" value={nozzle} onChange={(e) => setNozzle(Number(e.target.value))} onBlur={saveTemps} className="w-8 bg-transparent text-[11px] font-black text-slate-600 outline-none text-center" />
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                 <span className="text-[9px] font-black text-slate-400">BED</span>
                 <input type="number" value={bed} onChange={(e) => setBed(Number(e.target.value))} onBlur={saveTemps} className="w-6 bg-transparent text-[11px] font-black text-slate-600 outline-none text-center" />
              </div>
              <button onClick={() => setIsNoteOpen(true)} className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${note ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>

            <select 
              value={spool.storage || 'Air Libre'} 
              onChange={(e) => updateStorage(e.target.value)}
              className="w-full text-[9px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-bold uppercase text-slate-600 outline-none cursor-pointer"
            >
              <option value="Air Libre">Air Libre (30j)</option>
              <option value="Boite Hermetique">Boite Hermetique (90j)</option>
              <option value="Sous Vide">Sous Vide (365j)</option>
            </select>
          </div>
          
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl border-4 border-white shadow-md" style={{ backgroundColor: spool.colorHex }}></div>
            {isSilk && <div className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm border border-slate-100 text-[10px]">✨</div>}
          </div>
        </div>

        {/* Etoiles centrees */}
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => saveDetails(star, note)} className="focus:outline-none transition-transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={rating >= star ? "#F59E0B" : "none"} stroke={rating >= star ? "#F59E0B" : "#CBD5E1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </button>
          ))}
        </div>

        {/* Jauge de poids */}
        <div className="bg-slate-50 rounded-[2rem] p-5 mb-4 border border-slate-100">
          <div className="flex justify-between items-end mb-3">
            <div className="text-left"><span className="text-3xl font-black text-slate-900">{spool.currentWeight}</span><span className="text-xs font-bold text-slate-400 ml-1">g</span></div>
            <span className="text-[10px] font-black text-slate-400 uppercase">{Math.round((spool.currentWeight/spool.initialWeight)*100)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="h-full transition-all duration-500" style={{ width: `${(spool.currentWeight / spool.initialWeight) * 100}%`, backgroundColor: spool.colorHex }}></div>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex gap-2 relative">
            <div className="relative w-1/2">
               <input type="number" value={useAmount} onChange={(e) => setUseAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-100 p-3 pr-8 rounded-xl font-black text-center outline-none text-sm" />
               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">g</span>
            </div>
            <button onClick={() => onConsume(spool.id, useAmount)} className="flex-1 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">DEDUIRE</button>
          </div>

          {/* LE BOUTON SECHER (VERSION PARFAITE) */}
          {isHumid ? (
            <button 
              onClick={handleDry} 
              className="w-full py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-200 animate-pulse hover:scale-[1.02] transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 3.5 6.5 1 1.5 1 2.5 1 3.5a2.5 2.5 0 0 1-5 0Z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/></svg>
              <span className="text-xs">SECHER {lastDriedStr ? `(IL Y A ${daysSinceDried}J)` : '(JAMAIS FAIT)'}</span>
            </button>
          ) : (
            <button 
              onClick={handleDry} 
              className="w-full py-3 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span className="text-[10px]">SEC ({daysSinceDried} / {limit} J)</span>
            </button>
          )}
        </div>
      </div>

      {isNoteOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white">
              <h3 className="text-xl font-black mb-4 text-slate-900">Notes sur le filament #{spool.id}</h3>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full h-32 bg-slate-50 rounded-2xl p-4 text-sm font-medium outline-none border border-slate-100 mb-6 resize-none text-slate-700" />
              <div className="flex gap-3">
                 <button onClick={() => setIsNoteOpen(false)} className="flex-1 py-3 rounded-xl font-black uppercase text-[10px] bg-slate-100 text-slate-500">Annuler</button>
                 <button onClick={() => { saveDetails(rating, note); setIsNoteOpen(false); }} className="flex-1 py-3 rounded-xl font-black uppercase text-[10px] bg-slate-900 text-white shadow-lg">Enregistrer</button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
