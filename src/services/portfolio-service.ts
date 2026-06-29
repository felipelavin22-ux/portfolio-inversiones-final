import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { mockAssets, mockTransactions } from "@/lib/mock-data";
import type { Asset, AssetFormInput, TransactionFormInput, TransactionWithAsset } from "@/types/database";

export async function getAssets(search = ""): Promise<Asset[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockAssets.filter((asset) => `${asset.name} ${asset.ticker}`.toLowerCase().includes(search.toLowerCase()));
  }
  let query = supabase.from("assets").select("*").order("created_at", { ascending: false });
  if (search) query = query.or(`name.ilike.%${search}%,ticker.ilike.%${search}%`);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getTransactions(): Promise<TransactionWithAsset[]> {
  if (!isSupabaseConfigured || !supabase) return mockTransactions;
  const { data, error } = await supabase.from("transactions").select("*, assets(*)").order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as TransactionWithAsset[];
}

export async function createAsset(input: AssetFormInput): Promise<void> {
  if (!supabase) throw new Error("Configura Supabase para guardar activos reales.");
  const { error } = await supabase.from("assets").insert({ ...input, ticker: input.ticker.toUpperCase() });
  if (error) throw new Error(error.message);
}

export async function updateAsset(id: string, input: AssetFormInput): Promise<void> {
  if (!supabase) throw new Error("Configura Supabase para editar activos reales.");
  const { error } = await supabase.from("assets").update({ ...input, ticker: input.ticker.toUpperCase() }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function createTransaction(input: TransactionFormInput): Promise<void> {
  if (!supabase) throw new Error("Configura Supabase para guardar movimientos reales.");
  const { error } = await supabase.from("transactions").insert(input);
  if (error) throw new Error(error.message);
}
