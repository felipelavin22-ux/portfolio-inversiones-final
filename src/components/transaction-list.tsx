import type { TransactionWithAsset } from "@/types/database";

const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export function TransactionList({ transactions }: { transactions: TransactionWithAsset[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="border-b border-line p-5"><h2 className="text-lg font-bold text-ink">Movimientos</h2><p className="text-sm text-muted">Historial ordenado por fecha.</p></div>
      <div className="divide-y divide-line">
        {transactions.map((tx) => (
          <article key={tx.id} className="grid gap-2 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div><span className={`rounded-full px-3 py-1 text-xs font-bold ${tx.type === "buy" ? "bg-green-50 text-pine" : "bg-orange-50 text-flame"}`}>{tx.type}</span><strong className="ml-3 text-ink">{tx.assets?.ticker ?? "Activo"}</strong><p className="mt-2 text-sm text-muted">{tx.date} - {tx.quantity} unidades a {money.format(tx.price_per_unit)}</p>{tx.notes && <p className="text-sm text-muted">{tx.notes}</p>}</div>
            <strong className="text-right text-ink">{money.format(tx.quantity * tx.price_per_unit)}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}
