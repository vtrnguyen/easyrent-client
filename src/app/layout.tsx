import "./globals.css";

import { Toaster } from "react-hot-toast";

import AuthProvider from "@/shared/providers/auth-provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body>
                <AuthProvider>
                    {children}
                    <Toaster position="top-right" />
                </AuthProvider>
            </body>
        </html>
    );
}