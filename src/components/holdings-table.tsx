import type { Holding } from "@/lib/portfolio";

const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="border-b border-line p-5"><h2 className="text-lg font-bold text-ink">Posiciones actuales</h2><p className="text-sm text-muted">Resumen calculado desde los movimientos.</p></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-canvas text-sm text-muted"><tr><th className="p-4">Activo</th><th className="p-4">Cantidad</th><th className="p-4">Invertido</th><th className="p-4">Precio prom.</th><th className="p-4">Asignación</th><th className="p-4">Objetivo</th></tr></thead>
          <tbody>
            {holdings.map((item) => (
              <tr key={item.asset.id} className="border-t border-line">
                <td className="p-4"><strong className="block text-ink">{item.asset.ticker}</strong><span className="text-sm text-muted">{item.asset.name}</span></td>
                <td className="p-4 font-semibold">{item.quantity.toFixed(4)}</td>
                <td className="p-4">{money.format(item.invested)}</td>
                <td className="p-4">{money.format(item.averagePrice)}</td>
                <td className="p-4"><div className="h-2 w-32 rounded-full bg-canvas"><div className="h-2 rounded-full bg-pine" style={{ width: `${Math.min(item.allocation, 100)}%` }} /></div><span className="text-xs text-muted">{item.allocation.toFixed(1)}%</span></td>
                <td className="p-4">{item.asset.target_allocation}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
