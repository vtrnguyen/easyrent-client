import UserDetailPage from '../_components/UserDetailPage';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function UpdateUserPage({ params }: Props) {
    const { id } = await params;

    return <UserDetailPage userId={id} />;
}
