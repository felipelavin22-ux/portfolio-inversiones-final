import type { Asset, TransactionWithAsset } from "@/types/database";

export const mockAssets: Asset[] = [
  { id: "a1", name: "Apple Inc.", ticker: "AAPL", type: "stock", currency: "USD", target_allocation: 22, created_at: "2026-01-01" },
  { id: "a2", name: "Bitcoin", ticker: "BTC", type: "crypto", currency: "USD", target_allocation: 20, created_at: "2026-01-01" },
  { id: "a3", name: "Ethereum", ticker: "ETH", type: "crypto", currency: "USD", target_allocation: 14, created_at: "2026-01-01" },
  { id: "a4", name: "S&P 500 ETF", ticker: "VOO", type: "etf", currency: "USD", target_allocation: 32, created_at: "2026-01-01" },
  { id: "a5", name: "Bono AL30", ticker: "AL30", type: "bond", currency: "ARS", target_allocation: 12, created_at: "2026-01-01" }
];

export const mockTransactions: TransactionWithAsset[] = [
  { id: "t1", asset_id: "a1", type: "buy", quantity: 5, price_per_unit: 165, date: "2026-01-15", notes: "Primera compra", created_at: "2026-01-15", assets: mockAssets[0] },
  { id: "t2", asset_id: "a1", type: "sell", quantity: 1, price_per_unit: 195, date: "2026-04-20", notes: "Toma parcial", created_at: "2026-04-20", assets: mockAssets[0] },
  { id: "t3", asset_id: "a2", type: "buy", quantity: 0.05, price_per_unit: 42000, date: "2026-02-01", notes: "Entrada inicial", created_at: "2026-02-01", assets: mockAssets[1] },
  { id: "t4", asset_id: "a3", type: "buy", quantity: 1.5, price_per_unit: 2400, date: "2026-02-10", notes: null, created_at: "2026-02-10", assets: mockAssets[2] },
  { id: "t5", asset_id: "a4", type: "buy", quantity: 4, price_per_unit: 420, date: "2026-01-08", notes: "DCA", created_at: "2026-01-08", assets: mockAssets[3] },
  { id: "t6", asset_id: "a5", type: "buy", quantity: 100, price_per_unit: 52, date: "2026-03-15", notes: "Cobertura", created_at: "2026-03-15", assets: mockAssets[4] }
];
