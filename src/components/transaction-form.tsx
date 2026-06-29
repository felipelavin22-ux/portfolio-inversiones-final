"use client";

import { useState } from "react";
import type { Asset, TransactionFormInput, TransactionType } from "@/types/database";

type Props = { assets: Asset[]; onSubmit: (input: TransactionFormInput) => Promise<void> };

export function TransactionForm({ assets, onSubmit }: Props) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(formData: FormData) {
    setError("");
    const input: TransactionFormInput = {
      asset_id: String(formData.get("asset_id")),
      type: String(formData.get("type")) as TransactionType,
      quantity: Number(formData.get("quantity")),
      price_per_unit: Number(formData.get("price_per_unit")),
      date: String(formData.get("date")),
      notes: String(formData.get("notes") ?? "")
    };
    if (!input.asset_id || !input.date || input.quantity <= 0 || input.price_per_unit <= 0) { setError("Revisá activo, fecha, cantidad y precio."); return; }
    try { setSaving(true); await onSubmit(input); } catch (err) { setError(err instanceof Error ? err.message : "No se pudo guardar el movimiento."); } finally { setSaving(false); }
  }

  return (
    <form action={submit} className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div><h2 className="text-lg font-bold text-ink">Nuevo movimiento</h2><p className="text-sm text-muted">Registrá compras y ventas del portfolio.</p></div>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
      <label className="grid gap-1 text-sm font-semibold text-muted">Activo<select name="asset_id" className="rounded-lg border border-line px-3 py-2 text-ink">{assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.ticker} - {asset.name}</option>)}</select></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm font-semibold text-muted">Tipo<select name="type" className="rounded-lg border border-line px-3 py-2 text-ink"><option value="buy">buy</option><option value="sell">sell</option></select></label>
        <label className="grid gap-1 text-sm font-semibold text-muted">Fecha<input name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="rounded-lg border border-line px-3 py-2 text-ink" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm font-semibold text-muted">Cantidad<input name="quantity" type="number" min="0" step="0.00000001" className="rounded-lg border border-line px-3 py-2 text-ink" /></label>
        <label className="grid gap-1 text-sm font-semibold text-muted">Precio unitario<input name="price_per_unit" type="number" min="0" step="0.0001" className="rounded-lg border border-line px-3 py-2 text-ink" /></label>
      </div>
      <label className="grid gap-1 text-sm font-semibold text-muted">Notas<textarea name="notes" className="min-h-20 rounded-lg border border-line px-3 py-2 text-ink" /></label>
      <button disabled={saving} className="rounded-lg bg-ocean px-4 py-2 font-bold text-white disabled:opacity-60">{saving ? "Guardando..." : "Guardar movimiento"}</button>
    </form>
  );
}
