import type { LucideIcon } from "lucide-react";

type Props = { label: string; value: string; helper: string; icon: LucideIcon };

export function MetricCard({ label, value, helper, icon: Icon }: Props) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-muted">{label}</span>
        <span className="grid size-10 place-items-center rounded-lg bg-canvas text-ocean"><Icon size={20} /></span>
      </div>
      <strong className="block text-2xl font-bold tracking-normal text-ink">{value}</strong>
      <p className="mt-2 text-sm text-muted">{helper}</p>
    </article>
  );
}
