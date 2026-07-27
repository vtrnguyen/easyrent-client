interface CardProps {
    title: string;
    children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-3">
                <h2 className="font-semibold text-slate-900">{title}</h2>
            </div>

            <div className="p-5">{children}</div>
        </div>
    );
}
