'use client';

import Image from 'next/image';

import GuestGuard from '@/shared/guards/guest-guard';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <GuestGuard>
            <div className="min-h-dvh bg-white text-white lg:grid lg:h-dvh lg:grid-cols-[1.05fr_0.95fr] lg:overflow-hidden lg:bg-[#08111f]">
                <aside className="relative hidden h-full overflow-hidden border-r border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 lg:flex">
                    <div className="absolute inset-0">
                        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
                        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
                    </div>

                    <div className="relative flex h-full w-full items-center justify-center p-12">
                        <Image
                            src="/login.png"
                            alt="EasyRent"
                            width={900}
                            height={700}
                            priority
                            className="max-h-[80vh] w-full object-contain"
                        />
                    </div>
                </aside>

                <main className="flex min-h-dvh w-full items-center justify-center bg-white px-4 py-8 sm:px-6 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:bg-[#08111f] lg:px-12">
                    <div className="w-full max-w-md">{children}</div>
                </main>
            </div>
        </GuestGuard>
    );
}
