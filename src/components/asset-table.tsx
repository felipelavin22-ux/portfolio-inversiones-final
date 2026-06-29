"use client";

import { Pencil } from "lucide-react";
import type { Asset } from "@/types/database";

type Props = { assets: Asset[]; onEdit: (asset: Asset) => void };

export function AssetTable({ assets, onEdit }: Props) {
  if (!assets.length) return <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-muted">No hay activos para mostrar.</div>;
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="bg-canvas text-sm text-muted"><tr><th className="p-4">Activo</th><th className="p-4">Tipo</th><th className="p-4">Moneda</th><th className="p-4">Objetivo</th><th className="p-4">Acciones</th></tr></thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-t border-line">
                <td className="p-4"><strong className="block text-ink">{asset.ticker}</strong><span className="text-sm text-muted">{asset.name}</span></td>
                <td className="p-4"><span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-ocean">{asset.type}</span></td>
                <td className="p-4 text-muted">{asset.currency}</td>
                <td className="p-4 font-semibold">{asset.target_allocation}%</td>
                <td className="p-4"><button onClick={() => onEdit(asset)} className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-bold text-ink hover:bg-canvas"><Pencil size={16} />Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
