"use client";
import { useState, useEffect } from "react";
import SpoolCard from "../components/SpoolCard";

export default function StockPage() {
  const [spools, setSpools] = useState([]);

  useEffect(() => {
    fetch("/api/spools")
      .then(res => res.ok ? res.json() : [])
      .then(data => setSpools(Array.isArray(data) ? data : []));
  }, []);

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase mb-10">Mon Stock</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spools.map((s) => <SpoolCard key={s.id} spool={s} />)}
      </div>
    </main>
  );
}