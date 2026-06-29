export type AssetType = "stock" | "crypto" | "bond" | "etf" | "real_estate" | "other";
export type Currency = "USD" | "ARS" | "EUR";
export type TransactionType = "buy" | "sell";

export type Asset = {
  id: string;
  name: string;
  ticker: string;
  type: AssetType;
  currency: Currency;
  target_allocation: number;
  created_at: string;
};

export type Transaction = {
  id: string;
  asset_id: string;
  type: TransactionType;
  quantity: number;
  price_per_unit: number;
  date: string;
  notes: string | null;
  created_at: string;
};

export type TransactionWithAsset = Transaction & { assets: Asset | null };

export type AssetFormInput = Omit<Asset, "id" | "created_at">;
export type TransactionFormInput = Omit<Transaction, "id" | "created_at">;
