import './globals.css';

import { Toaster } from 'react-hot-toast';

import AuthProvider from '@/shared/providers/auth-provider';
import { LoadingOverlayProvider } from '@/shared/components/loading-overlay/loading-overlay-provider';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body>
                <LoadingOverlayProvider>
                    <AuthProvider>
                        {children}
                        <Toaster position="top-right" />
                    </AuthProvider>
                </LoadingOverlayProvider>
            </body>
        </html>
    );
}
