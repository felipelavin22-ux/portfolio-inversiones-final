import type { Asset, TransactionWithAsset } from "@/types/database";

export type Holding = {
  asset: Asset;
  quantity: number;
  invested: number;
  averagePrice: number;
  allocation: number;
};

export function calculateHoldings(transactions: TransactionWithAsset[]): Holding[] {
  const map = new Map<string, Holding>();
  for (const tx of transactions) {
    if (!tx.assets) continue;
    const current = map.get(tx.asset_id) ?? { asset: tx.assets, quantity: 0, invested: 0, averagePrice: 0, allocation: 0 };
    const sign = tx.type === "buy" ? 1 : -1;
    current.quantity += Number(tx.quantity) * sign;
    current.invested += Number(tx.quantity) * Number(tx.price_per_unit) * sign;
    current.averagePrice = current.quantity > 0 ? current.invested / current.quantity : 0;
    map.set(tx.asset_id, current);
  }
  const holdings = Array.from(map.values()).filter((item) => item.quantity > 0);
  const total = holdings.reduce((sum, item) => sum + item.invested, 0);
  return holdings.map((item) => ({ ...item, allocation: total > 0 ? (item.invested / total) * 100 : 0 }));
}

export function portfolioMetrics(holdings: Holding[]) {
  return {
    totalInvested: holdings.reduce((sum, item) => sum + item.invested, 0),
    positions: holdings.length,
    avgTargetDeviation: holdings.length
      ? holdings.reduce((sum, item) => sum + Math.abs(item.allocation - item.asset.target_allocation), 0) / holdings.length
      : 0
  };
}
