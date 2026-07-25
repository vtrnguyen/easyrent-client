import { AccountRole } from "@/common/enums/appEnums";
import AuthGuard from "@/shared/guards/auth-guard";
import TenantLayout from "@/shared/layouts/tenant-layout";

export default function PostDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <AuthGuard allowedRoles={[AccountRole.Tenant]}>
            <TenantLayout>
                <section className="space-y-4">
                    <h1 className="text-3xl font-semibold">Chi tiết bài viết</h1>
                    <p className="text-zinc-600">Bài viết: {params.id}</p>
                </section>
            </TenantLayout>
        </AuthGuard>
    );
}