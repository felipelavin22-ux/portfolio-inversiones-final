"use client";

import { useState } from "react";
import type { Asset, AssetFormInput, AssetType, Currency } from "@/types/database";

type Props = { asset?: Asset; onSubmit: (input: AssetFormInput) => Promise<void>; onCancel?: () => void };

const assetTypes: AssetType[] = ["stock", "crypto", "bond", "etf", "real_estate", "other"];
const currencies: Currency[] = ["USD", "ARS", "EUR"];

export function AssetForm({ asset, onSubmit, onCancel }: Props) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(formData: FormData) {
    setError("");
    const input: AssetFormInput = {
      name: String(formData.get("name") ?? "").trim(),
      ticker: String(formData.get("ticker") ?? "").trim().toUpperCase(),
      type: String(formData.get("type")) as AssetType,
      currency: String(formData.get("currency")) as Currency,
      target_allocation: Number(formData.get("target_allocation"))
    };
    if (input.name.length < 2 || input.ticker.length < 1) { setError("Completá nombre y ticker para continuar."); return; }
    if (Number.isNaN(input.target_allocation) || input.target_allocation < 0 || input.target_allocation > 100) { setError("La asignación objetivo debe estar entre 0 y 100."); return; }
    try { setSaving(true); await onSubmit(input); } catch (err) { setError(err instanceof Error ? err.message : "No se pudo guardar el activo."); } finally { setSaving(false); }
  }

  return (
    <form action={submit} className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div><h2 className="text-lg font-bold text-ink">{asset ? "Editar activo" : "Nuevo activo"}</h2><p className="text-sm text-muted">Definí el instrumento y su peso objetivo.</p></div>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
      <label className="grid gap-1 text-sm font-semibold text-muted">Nombre<input name="name" defaultValue={asset?.name} className="rounded-lg border border-line px-3 py-2 text-ink" /></label>
      <label className="grid gap-1 text-sm font-semibold text-muted">Ticker<input name="ticker" defaultValue={asset?.ticker} className="rounded-lg border border-line px-3 py-2 text-ink" /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm font-semibold text-muted">Tipo<select name="type" defaultValue={asset?.type ?? "stock"} className="rounded-lg border border-line px-3 py-2 text-ink">{assetTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label className="grid gap-1 text-sm font-semibold text-muted">Moneda<select name="currency" defaultValue={asset?.currency ?? "USD"} className="rounded-lg border border-line px-3 py-2 text-ink">{currencies.map((currency) => <option key={currency}>{currency}</option>)}</select></label>
      </div>
      <label className="grid gap-1 text-sm font-semibold text-muted">Asignación objetivo %<input name="target_allocation" type="number" min="0" max="100" step="0.1" defaultValue={asset?.target_allocation ?? 10} className="rounded-lg border border-line px-3 py-2 text-ink" /></label>
      <div className="flex gap-2">
        <button disabled={saving} className="rounded-lg bg-ocean px-4 py-2 font-bold text-white disabled:opacity-60">{saving ? "Guardando..." : "Guardar"}</button>
        {onCancel && <button type="button" onClick={onCancel} className="rounded-lg border border-line px-4 py-2 font-bold text-ink">Cancelar</button>}
      </div>
    </form>
  );
}
