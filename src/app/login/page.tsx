"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isRegister) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
          toast.success("Compte cree avec succes ! Connectez-vous maintenant.");
          setIsRegister(false);
        } else {
          toast.error("Erreur lors de la creation du compte.");
        }
      } catch (err) {
        toast.error("Une erreur est survenue.");
      }
    } else {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.ok) {
        toast.success("Connexion reussie !");
        router.push("/");
      } else {
        toast.error("Email ou mot de passe incorrect.");
      }
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-4 shadow-xl">SM</div>
          <h1 className="text-3xl font-[1000] tracking-tighter text-slate-900">SpoolMaster</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Gestion de stock prive</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input required type="text" placeholder="Nom complet" className="w-full bg-white/50 p-5 rounded-2xl outline-none border border-white shadow-inner font-bold" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <input required type="email" placeholder="Email" className="w-full bg-white/50 p-5 rounded-2xl outline-none border border-white shadow-inner font-bold" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder="Mot de passe" className="w-full bg-white/50 p-5 rounded-2xl outline-none border border-white shadow-inner font-bold" value={password} onChange={(e) => setPassword(e.target.value)} />
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl mt-4 flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              isRegister ? "Creer mon compte" : "Se connecter"
            )}
          </button>
        </form>

        <button 
          onClick={() => setIsRegister(!isRegister)} 
          className="w-full mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
        >
          {isRegister ? "Deja un compte ? Se connecter" : "Pas encore de compte ? S'inscrire"}
        </button>
      </div>
    </main>
  );
}