import { AccountRole } from "@/common/enums/appEnums";
import AuthGuard from "@/shared/guards/auth-guard";
import LandlordLayout from "@/shared/layouts/landlord-layout";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard allowedRoles={[AccountRole.Landlord]}>
            <LandlordLayout>
                {children}
            </LandlordLayout>
        </AuthGuard>
    );
}