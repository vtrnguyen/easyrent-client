import { FiClock, FiMail, FiPhone } from 'react-icons/fi';
import TenantLayout from '@/shared/layouts/tenant-layout';

export function InfoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <section className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
            {children}
        </section>
    );
}

export default function InfoPageShell({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <TenantLayout>
            <div className="mx-auto max-w-6xl space-y-8">
                <header>
                    <p className="text-sm font-semibold tracking-[0.18em] text-blue-600 uppercase">EasyRent</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
                </header>
                {children}
                <section className="rounded-2xl bg-slate-900 p-6 text-white">
                    <h2 className="text-lg font-semibold">Liên hệ EasyRent</h2>
                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-300">
                        <a href="tel:0686868688" className="flex items-center gap-2">
                            <FiPhone />
                            0686868688
                        </a>
                        <a href="mailto:info@easyrent.com.vn" className="flex items-center gap-2">
                            <FiMail />
                            info@easyrent.com.vn
                        </a>
                        <span className="flex items-center gap-2">
                            <FiClock />
                            08:00–17:30, Thứ 2–Thứ 7
                        </span>
                    </div>
                </section>
            </div>
        </TenantLayout>
    );
}
