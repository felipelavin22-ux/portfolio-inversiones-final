"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, BriefcaseBusiness, CircleDollarSign, Database, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { AssetForm } from "@/components/asset-form";
import { AssetTable } from "@/components/asset-table";
import { HoldingsTable } from "@/components/holdings-table";
import { MetricCard } from "@/components/metric-card";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { calculateHoldings, portfolioMetrics } from "@/lib/portfolio";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createAsset, createTransaction, getAssets, getTransactions, updateAsset } from "@/services/portfolio-service";
import type { Asset } from "@/types/database";

const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Home() {
  const [view, setView] = useState<"dashboard" | "assets" | "transactions">("dashboard");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Asset | undefined>();

  async function load() {
    try {
      setLoading(true); setError("");
      const [assetData, transactionData] = await Promise.all([getAssets(search), getTransactions()]);
      setAssets(assetData); setTransactions(transactionData);
    } catch (err) { setError(err instanceof Error ? err.message : "No se pudieron cargar los datos."); }
    finally { setLoading(false); }
  }

  useEffect(() => { void load(); }, []);
  const holdings = useMemo(() => calculateHoldings(transactions), [transactions]);
  const metrics = useMemo(() => portfolioMetrics(holdings), [holdings]);

  async function saveAsset(input: any) {
    if (editing) await updateAsset(editing.id, input); else await createAsset(input);
    setEditing(undefined); await load();
  }

  async function saveTransaction(input: any) { await createTransaction(input); await load(); }

  return (
    <main className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-ink p-5 text-white lg:block">
        <div className="mb-8 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-lg bg-[#F4C95D] font-black text-ink">V</span><div><strong>Vault</strong><p className="text-sm text-slate-300">Portfolio manager</p></div></div>
        <nav className="grid gap-2">
          {[ ["dashboard", "Tablero", BarChart3], ["assets", "Activos", BriefcaseBusiness], ["transactions", "Movimientos", CircleDollarSign] ].map(([id, label, Icon]: any) => (
            <button key={id} onClick={() => setView(id)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left font-semibold ${view === id ? "bg-white text-ink" : "text-slate-300 hover:bg-slate-800"}`}><Icon size={18} />{label}</button>
          ))}
        </nav>
      </aside>
      <section className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-line bg-canvas/95 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-wide text-muted">Challenge AranguriApps</p><h1 className="text-3xl font-bold tracking-normal text-ink">Vault</h1></div>
            <div className="flex flex-wrap gap-2"><button onClick={() => setView("dashboard")} className="rounded-lg border border-line bg-white px-3 py-2 font-bold lg:hidden">Tablero</button><button onClick={() => setView("assets")} className="rounded-lg border border-line bg-white px-3 py-2 font-bold lg:hidden">Activos</button><button onClick={() => setView("transactions")} className="rounded-lg border border-line bg-white px-3 py-2 font-bold lg:hidden">Movimientos</button><button onClick={load} className="inline-flex items-center gap-2 rounded-lg bg-ocean px-4 py-2 font-bold text-white"><RefreshCw size={16} />Actualizar</button></div>
          </div>
        </header>
        <div className="p-5 lg:p-8">
          {!isSupabaseConfigured && <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">Modo demo activo: configurá Supabase para habilitar creación y edición persistente.</div>}
          {error && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
          {loading ? <div className="rounded-lg border border-line bg-white p-8 text-center text-muted shadow-soft">Cargando datos...</div> : (
            <div className="grid gap-6">
              {view === "dashboard" && <><section className="grid gap-4 md:grid-cols-3"><MetricCard label="Capital invertido" value={money.format(metrics.totalInvested)} helper="Calculado desde compras y ventas" icon={Database} /><MetricCard label="Posiciones" value={String(metrics.positions)} helper="Activos con tenencia actual" icon={BriefcaseBusiness} /><MetricCard label="Desvío objetivo" value={`${metrics.avgTargetDeviation.toFixed(1)}%`} helper="Promedio vs asignación deseada" icon={ShieldCheck} /></section><HoldingsTable holdings={holdings} /></>}
              {view === "assets" && <div className="grid gap-5 xl:grid-cols-[1fr_360px]"><section className="grid gap-4"><div className="flex flex-col gap-3 rounded-lg border border-line bg-white p-4 shadow-soft md:flex-row md:items-center"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 text-muted" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre o ticker" className="w-full rounded-lg border border-line py-2 pl-10 pr-3" /></div><button onClick={load} className="rounded-lg bg-ink px-4 py-2 font-bold text-white">Filtrar</button></div><AssetTable assets={assets} onEdit={setEditing} /></section><AssetForm asset={editing} onSubmit={saveAsset} onCancel={() => setEditing(undefined)} /></div>}
              {view === "transactions" && <div className="grid gap-5 xl:grid-cols-[1fr_380px]"><TransactionList transactions={transactions} /><TransactionForm assets={assets} onSubmit={saveTransaction} /></div>}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
