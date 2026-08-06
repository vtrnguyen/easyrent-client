interface ChartItem {
    label: string;
    value: number;
    displayValue?: string;
}

export default function BarChart({ items }: { items: ChartItem[] }) {
    const max = Math.max(...items.map((item) => item.value), 1);
    return (
        <div className="flex h-56 items-end gap-3 pt-6">
            {items.map((item) => (
                <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-2">
                    <div className="text-center text-xs font-medium text-slate-600">
                        {item.displayValue ?? item.value}
                    </div>
                    <div className="flex h-full items-end rounded-t-md bg-slate-100">
                        <div
                            className="w-full rounded-t-md bg-blue-600"
                            style={{ height: `${Math.max((item.value / max) * 100, 4)}%` }}
                        />
                    </div>
                    <div className="text-center text-xs text-slate-500">{item.label}</div>
                </div>
            ))}
        </div>
    );
}
