import { IconType } from 'react-icons';

interface Props {
    label: string;
    value: string;
    note: string;
    icon: IconType;
    tone?: 'blue' | 'green' | 'amber' | 'slate';
}

const toneClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    slate: 'bg-slate-100 text-slate-700',
};

export default function StatCard({ label, value, note, icon: Icon, tone = 'blue' }: Props) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">{note}</p>
        </div>
    );
}
