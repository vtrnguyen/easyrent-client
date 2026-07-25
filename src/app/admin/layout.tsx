import { AccountRole } from "@/common/enums/appEnums";
import AuthGuard from "@/shared/guards/auth-guard";
import AdminLayout from "@/shared/layouts/admin-layout";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <AuthGuard allowedRoles={[AccountRole.Admin]}>
            <AdminLayout>
                {children}
            </AdminLayout>
        </AuthGuard>
    );
}