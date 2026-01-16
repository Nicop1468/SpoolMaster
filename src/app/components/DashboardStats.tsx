"use client";

export default function DashboardStats({ spools, history, fetchData }: any) {
  const totalWeight = spools.reduce((acc:any, s:any) => acc + s.currentWeight, 0);
  const typeStats = spools.reduce((acc:any, s:any) => {
    if (!acc[s.type]) acc[s.type] = { count: 0, weight: 0 };
    acc[s.type].count++;
    acc[s.type].weight += s.currentWeight;
    return acc;
  }, {});

  const qualityStats = spools.reduce((acc: any, s: any) => {
    if (s.rating > 0 || (s.note && s.note.trim() !== "")) {
      const key = `${s.brand} ${s.type} ${s.color}`;
      if (!acc[key]) acc[key] = { brand: s.brand, type: s.type, color: s.color, colorHex: s.colorHex, totalRating: 0, countRating: 0, notes: [] };
      if (s.rating > 0) { acc[key].totalRating += s.rating; acc[key].countRating++; }
      if (s.note && s.note.trim() !== "") { acc[key].notes.push({ id: s.id, text: s.note }); }
    }
    return acc;
  }, {});

  const deleteNote = async (spoolId: number) => {
    if(!confirm("Supprimer ce commentaire ?")) return;
    await fetch('/api/spools', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: spoolId, action: 'update_details', rating: spools.find((s:any) => s.id === spoolId).rating, note: "" })
    });
    if(fetchData) fetchData();
  };

  return (
    <div className="space-y-12 animate-in fade-in">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-left">
        <h3 className="text-2xl font-black mb-8 tracking-tighter">Repartition par Matiere</h3>
        <div className="space-y-6">
          {Object.entries(typeStats).map(([type, data]: any) => (
            <div key={type}>
              <div className="flex justify-between mb-2">
                <span className="font-black text-slate-700">{type}</span>
                <span className="text-xs font-bold text-slate-400">{data.count} bobines ({data.weight}g)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-slate-900 h-full rounded-full" style={{ width: `${(data.weight / totalWeight) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-left">
        <h3 className="text-2xl font-black mb-8 tracking-tighter">Retours Qualite & Notes</h3>
        <div className="grid grid-cols-1 gap-6">
          {Object.values(qualityStats).map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-4 border-white shadow-sm" style={{backgroundColor: item.colorHex}}></div>
                    <div><h4 className="font-black text-lg text-slate-900">{item.brand}</h4><span className="text-[10px] font-black text-slate-400 uppercase">{item.type} - {item.color}</span></div>
                 </div>
                 {item.countRating > 0 && (
                   <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1">
                      <span className="text-sm font-black text-yellow-500">{(item.totalRating / item.countRating).toFixed(1)}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                   </div>
                 )}
              </div>
              <div className="space-y-2 mt-4">
                {item.notes.map((note:any, nIdx:number) => (
                  <div key={nIdx} className="bg-white p-3 rounded-xl text-xs font-medium text-slate-600 border border-slate-100 italic relative pl-8 pr-10 group">
                     <span className="absolute left-3 top-3 text-[8px] font-black text-slate-300">#{note.id}</span>
                     "{note.text}"
                     <button onClick={() => deleteNote(note.id)} className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}